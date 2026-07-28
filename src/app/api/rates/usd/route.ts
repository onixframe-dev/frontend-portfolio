import { NextResponse } from "next/server";

export const revalidate = 3600;

type NbrbRate = {
  Date: string;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_OfficialRate: number;
};

export async function GET() {
  try {
    const response = await fetch("https://api.nbrb.by/exrates/rates/USD?parammode=2", {
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`NBRB responded with ${response.status}`);
    }

    const rate = (await response.json()) as NbrbRate;
    const bynPerUsd = rate.Cur_OfficialRate / rate.Cur_Scale;

    return NextResponse.json({
      source: "НБРБ",
      currency: rate.Cur_Abbreviation,
      rate: bynPerUsd,
      officialRate: rate.Cur_OfficialRate,
      scale: rate.Cur_Scale,
      date: rate.Date,
    });
  } catch {
    return NextResponse.json(
      { error: "Не удалось получить курс НБРБ" },
      { status: 502 },
    );
  }
}
