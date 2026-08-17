import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OnixFrame — разработка сайтов и интерфейсов";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          color: "#f7fbff",
          background: "linear-gradient(135deg, #020304 0%, #061315 48%, #120f25 100%)",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 74% 24%, rgba(92,225,230,.22), transparent 24%), radial-gradient(circle at 18% 78%, rgba(124,92,255,.24), transparent 30%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 86,
              height: 86,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 26,
              border: "1px solid rgba(255,255,255,.18)",
              background: "rgba(255,255,255,.08)",
              color: "#bfc8ff",
              fontSize: 44,
              fontWeight: 900,
            }}
          >
            OF
          </div>
          <div style={{ fontSize: 54, fontWeight: 800 }}>OnixFrame</div>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 58,
            maxWidth: 980,
            fontSize: 76,
            lineHeight: 0.96,
            fontWeight: 760,
            letterSpacing: "-0.04em",
          }}
        >
          Чистый frontend для современных проектов
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 34,
            maxWidth: 840,
            color: "rgba(232,240,248,.76)",
            fontSize: 30,
            lineHeight: 1.35,
            fontWeight: 500,
          }}
        >
          Сайты, лендинги, каталоги и интерфейсы на React, Next.js и TypeScript.
        </div>
      </div>
    ),
    size,
  );
}
