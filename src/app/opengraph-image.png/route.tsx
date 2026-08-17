import { ImageResponse } from "next/og";
import { OpenGraphImageMarkup, openGraphImageSize } from "@/lib/opengraph-image";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(<OpenGraphImageMarkup />, openGraphImageSize);
}
