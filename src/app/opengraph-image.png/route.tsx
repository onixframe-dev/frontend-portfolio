import { ImageResponse } from "next/og";
import { OpenGraphImageMarkup, size } from "../opengraph-image";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(<OpenGraphImageMarkup />, size);
}
