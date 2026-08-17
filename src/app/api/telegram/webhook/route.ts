import { NextResponse } from "next/server";
import { handleTelegramWebhook } from "@/lib/telegram";

export async function POST(request: Request) {
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (webhookSecret) {
    const requestSecret = request.headers.get("x-telegram-bot-api-secret-token");

    if (requestSecret !== webhookSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await handleTelegramWebhook(await request.json());

  return NextResponse.json(
    {
      ok: result.ok,
      message: result.message,
    },
    { status: result.ok ? 200 : result.status },
  );
}
