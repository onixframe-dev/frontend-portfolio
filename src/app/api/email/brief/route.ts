import { NextResponse } from "next/server";
import { briefSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const payload = briefSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Некорректные данные заявки." }, { status: 400 });
  }

  const values = payload.data;
  const result = await sendEmail({
    subject: `Новая заявка OnixFrame: ${values.projectName}`,
    text: [
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
      `Контакт: ${values.contactContact}`,
      `Желаемый срок: ${values.deadline}`,
      `Дополнительные пожелания: ${values.notes || "Не указано"}`,
    ].join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.status === 503
          ? "Почта пока не настроена. Добавьте RESEND_API_KEY в .env.local."
          : "Не удалось отправить заявку.",
      },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true });
}
