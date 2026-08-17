type TelegramPayload = {
  text: string;
  parseMode?: "HTML";
  leadActions?: boolean;
};

const TELEGRAM_ENDPOINT = "https://api.telegram.org";
const leadStatusLabels = {
  new: "🟢 НОВАЯ ЗАЯВКА",
  read: "🔵 ПРОЧИТАНО",
  work: "🟠 В РАБОТЕ",
  done: "✅ ЗАКРЫТО",
} as const;
const leadStatusDivider = "━━━━━━━━━━━━";
const previousLeadStatusPrefixes = ["🟢 Новая", "👁 Прочитано", "🔧 В работе", "✅ Закрыто"];

type LeadStatus = keyof typeof leadStatusLabels;

type TelegramCallbackQuery = {
  id: string;
  data?: string;
  message?: {
    chat?: {
      id?: number | string;
    };
    message_id?: number;
    text?: string;
  };
};

type TelegramUpdate = {
  callback_query?: TelegramCallbackQuery;
};

export function escapeTelegramHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getLeadStatusKeyboard(activeStatus: LeadStatus = "new") {
  const statusRows: LeadStatus[][] = [
    ["read", "work"],
    ["done", "new"],
  ];

  return {
    inline_keyboard: statusRows.map((row) =>
      row.map((status) => ({
        text: `${status === activeStatus ? "✓ " : ""}${leadStatusLabels[status]}`,
        callback_data: `lead_status:${status}`,
      })),
    ),
  };
}

function hasStatusLine(line: string) {
  return [...Object.values(leadStatusLabels), ...previousLeadStatusPrefixes].some((label) => line.startsWith(label));
}

function applyLeadStatus(text: string, status: LeadStatus) {
  const lines = text.split("\n");

  if (lines[0] && hasStatusLine(lines[0])) {
    lines.shift();
  }

  if (lines[0] === leadStatusDivider) {
    lines.shift();
  }

  return `<b>${escapeTelegramHtml(leadStatusLabels[status])}</b>\n${leadStatusDivider}\n${escapeTelegramHtml(lines.join("\n").trim())}`;
}

async function callTelegramApi(method: string, payload: Record<string, unknown>) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return {
      ok: false,
      status: 503,
      message: "Telegram service is not configured",
    };
  }

  const response = await fetch(`${TELEGRAM_ENDPOINT}/bot${botToken}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: await response.text(),
    };
  }

  return {
    ok: true,
    status: response.status,
    message: await response.text(),
  };
}

export async function sendTelegramMessage({ text, parseMode, leadActions = false }: TelegramPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return {
      ok: false,
      status: 503,
      message: "Telegram service is not configured",
    };
  }

  const response = await callTelegramApi("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: parseMode,
    disable_web_page_preview: true,
    ...(leadActions ? { reply_markup: getLeadStatusKeyboard("new") } : {}),
  });

  return response.ok ? { ...response, message: "Telegram message sent" } : response;
}

export async function handleTelegramWebhook(update: TelegramUpdate) {
  const callbackQuery = update.callback_query;
  const status = callbackQuery?.data?.replace("lead_status:", "") as LeadStatus | undefined;

  if (!callbackQuery || !status || !(status in leadStatusLabels)) {
    return {
      ok: true,
      status: 200,
      message: "Telegram update skipped",
    };
  }

  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const messageText = callbackQuery.message?.text;

  if (!chatId || !messageId || !messageText) {
    await callTelegramApi("answerCallbackQuery", {
      callback_query_id: callbackQuery.id,
      text: "Не удалось обновить статус.",
    });

    return {
      ok: false,
      status: 400,
      message: "Invalid Telegram callback payload",
    };
  }

  const updatedText = applyLeadStatus(messageText, status);

  const editResult = await callTelegramApi("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text: updatedText,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: getLeadStatusKeyboard(status),
  });

  await callTelegramApi("answerCallbackQuery", {
    callback_query_id: callbackQuery.id,
    text: `Статус: ${leadStatusLabels[status]}`,
  });

  return editResult;
}
