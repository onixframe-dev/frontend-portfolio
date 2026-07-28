import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const payload = contactFormSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Некорректные данные формы." }, { status: 400 });
  }

  const { name, contact, message } = payload.data;
  const result = await sendEmail({
    subject: `Новое сообщение с сайта OnixFrame: ${name}`,
    text: [
      "Новое сообщение с сайта OnixFrame.",
      "",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      "",
      "Что нужно сделать:",
      message,
    ].join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.status === 503
          ? "Почта пока не настроена. Добавьте RESEND_API_KEY в .env.local."
          : "Не удалось отправить сообщение.",
      },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true });
}
