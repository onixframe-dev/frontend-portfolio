import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";
import { formatContactForEmail, formatContactForTelegram } from "@/lib/contact-methods";

export async function POST(request: Request) {
  const payload = contactFormSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Некорректные данные формы." }, { status: 400 });
  }

  const { name, contact, message } = payload.data;
  const emailContacts = formatContactForEmail(contact);
  const telegramContacts = formatContactForTelegram(contact);
  const emailMessage = [
    "Новое сообщение с сайта OnixFrame.",
    "",
    `Имя: ${name}`,
    "Контакты для связи:",
    emailContacts,
    "",
    "Что нужно сделать:",
    message,
  ].join("\n");
  const telegramMessage = [
    "<b>🟢 Новое сообщение OnixFrame</b>",
    "",
    "<b>👤 Контакты</b>",
    `Имя: <b>${escapeTelegramHtml(name)}</b>`,
    telegramContacts,
    "",
    "<b>📝 Что нужно сделать</b>",
    escapeTelegramHtml(message),
  ].join("\n");

  const [emailResult, telegramResult] = await Promise.all([
    sendEmail({
      subject: `Новое сообщение с сайта OnixFrame: ${name}`,
      text: emailMessage,
    }),
    sendTelegramMessage({ text: telegramMessage, parseMode: "HTML", leadActions: true }),
  ]);

  if (!emailResult.ok && !telegramResult.ok) {
    return NextResponse.json(
      {
        error: emailResult.status === 503 && telegramResult.status === 503
          ? "Отправка пока не настроена. Добавьте RESEND_API_KEY или TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local."
          : "Не удалось отправить сообщение.",
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
