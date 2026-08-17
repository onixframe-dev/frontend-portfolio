import { NextResponse } from "next/server";
import { briefSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";
import { formatContactForEmail, formatContactForTelegram } from "@/lib/contact-methods";

export async function POST(request: Request) {
  const payload = briefSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Некорректные данные заявки." }, { status: 400 });
  }

  const values = payload.data;
  const emailContacts = formatContactForEmail(values.contactContact);
  const telegramContacts = formatContactForTelegram(values.contactContact);
  const emailMessage = [
    "Новая заявка с сайта OnixFrame.",
    "",
    "О бизнесе",
    `Название проекта: ${values.projectName}`,
    `Чем занимается клиент: ${values.business}`,
    `Целевая аудитория: ${values.audience}`,
    `Главное преимущество: ${values.advantage}`,
    "",
    "О сайте",
    `Фирменный стиль: ${values.brandStyle}`,
    `Референсы: ${values.inspiration || "Не указано"}`,
    `Настроение сайта: ${values.mood}`,
    "",
    "Детали",
    `Тип сайта: ${values.siteType}`,
    `Формат разработки: ${values.packageKey}`,
    `Что подключить: ${values.integrations.join(", ")}`,
    "",
    "Контакты",
    `Имя: ${values.contactName}`,
    "Контакты для связи:",
    emailContacts,
    `Желаемый срок: ${values.deadline}`,
    `Дополнительные пожелания: ${values.notes || "Не указано"}`,
  ].join("\n");
  const telegramMessage = [
    "<b>🟢 Новая заявка OnixFrame</b>",
    "",
    "<b>👤 Контакты</b>",
    `Имя: <b>${escapeTelegramHtml(values.contactName)}</b>`,
    telegramContacts,
    `Срок: ${escapeTelegramHtml(values.deadline)}`,
    "",
    "<b>💼 О бизнесе</b>",
    `Проект: ${escapeTelegramHtml(values.projectName)}`,
    `Чем занимается: ${escapeTelegramHtml(values.business)}`,
    `Аудитория: ${escapeTelegramHtml(values.audience)}`,
    `Преимущество: ${escapeTelegramHtml(values.advantage)}`,
    "",
    "<b>🧩 О сайте</b>",
    `Тип: ${escapeTelegramHtml(values.siteType)}`,
    `Пакет: ${escapeTelegramHtml(values.packageKey)}`,
    `Фирменный стиль: ${escapeTelegramHtml(values.brandStyle)}`,
    `Настроение: ${escapeTelegramHtml(values.mood)}`,
    `Референсы: ${escapeTelegramHtml(values.inspiration || "Не указано")}`,
    "",
    "<b>⚙️ Подключить</b>",
    escapeTelegramHtml(values.integrations.join(", ")),
    "",
    "<b>📝 Пожелания</b>",
    escapeTelegramHtml(values.notes || "Не указано"),
  ].join("\n");

  const [emailResult, telegramResult] = await Promise.all([
    sendEmail({
      subject: `Новая заявка OnixFrame: ${values.projectName}`,
      text: emailMessage,
    }),
    sendTelegramMessage({ text: telegramMessage, parseMode: "HTML", leadActions: true }),
  ]);

  if (!emailResult.ok && !telegramResult.ok) {
    return NextResponse.json(
      {
        error: emailResult.status === 503 && telegramResult.status === 503
          ? "Отправка пока не настроена. Добавьте RESEND_API_KEY или TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local."
          : "Не удалось отправить заявку.",
      },
      { status: emailResult.status === 503 ? telegramResult.status : emailResult.status },
    );
  }

  return NextResponse.json({
    ok: true,
    channels: {
      email: emailResult.ok,
      telegram: telegramResult.ok,
    },
  });
}
