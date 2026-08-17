import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OnixFrame — чистый frontend для современных проектов";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const navItems = ["Каталог", "Услуги", "Подход", "Контакты", "Заявка"];
const sphereDots = Array.from({ length: 15 * 15 }, (_, index) => {
  const row = Math.floor(index / 15);
  const col = index % 15;
  const center = 7;
  const x = (col - center) / center;
  const y = (row - center) / center;
  const distance = Math.sqrt(x ** 2 + y ** 2);
  const z = Math.sqrt(Math.max(0, 1 - distance ** 2));

  return {
    x: 50 + x * 25 * (0.9 + z * 0.12),
    y: 48 + y * 35,
    size: 3.2 + z * 4.6,
    opacity: distance > 1.05 ? 0 : 0.16 + z * 0.82,
    color: distance > 0.58 ? "#2f7fdb" : "#70e9ef",
  };
});

export function OpenGraphImageMarkup() {
  return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#f7fbff",
          background: "#000",
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
              "radial-gradient(circle at 50% 28%, rgba(92,225,230,.07), transparent 28%), radial-gradient(circle at 50% 48%, rgba(124,92,255,.06), transparent 34%)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: 1176,
            height: 100,
            marginTop: 14,
            padding: "0 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,.13)",
            borderRadius: 48,
            background: "rgba(8, 10, 14, .92)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                border: "1px solid rgba(176,196,255,.48)",
                background: "linear-gradient(135deg, rgba(235,244,255,.92), rgba(105,126,255,.18))",
                color: "#0b1020",
                fontSize: 22,
                fontWeight: 950,
                boxShadow: "0 0 24px rgba(122,162,255,.22)",
              }}
            >
              OF
            </div>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 780 }}>
              <span>Onix</span>
              <span style={{ color: "#7aa2ff" }}>Frame</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            {navItems.map((item) => (
              <div key={item} style={{ color: "rgba(245,249,255,.78)", fontSize: 18, fontWeight: 650 }}>
                {item}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["Git", "IG", "TG"].map((item) => (
              <div
                key={item}
                style={{
                  width: 58,
                  height: 58,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,.14)",
                  borderRadius: 999,
                  color: "rgba(245,249,255,.86)",
                  background: "rgba(255,255,255,.055)",
                  fontSize: 15,
                  fontWeight: 760,
                }}
              >
                {item}
              </div>
            ))}
            <div
              style={{
                height: 58,
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 999,
                background: "rgba(255,255,255,.055)",
                fontSize: 18,
                fontWeight: 780,
              }}
            >
              Связаться
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 350,
            top: 102,
            width: 500,
            height: 390,
          }}
        >
          {sphereDots.map((dot, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
                opacity: dot.opacity,
                borderRadius: 999,
                background: dot.color,
                boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "relative",
            marginTop: 114,
            width: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", fontSize: 52, lineHeight: 0.98, fontWeight: 560 }}>
            <div style={{ color: "#eff7ff" }}>Чистый frontend</div>
            <div>
              <span style={{ color: "#c9fbff" }}>для </span>
              <span style={{ color: "#eef7ff" }}>современных</span>
            </div>
            <div style={{ color: "#8b72ff" }}>проектов</div>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "rgba(232,240,248,.76)",
              fontSize: 19,
              lineHeight: 1.55,
              fontWeight: 520,
            }}
          >
            <div>Современные сайты и интерфейсы</div>
            <div>на HTML, CSS, JavaScript, React, Next.js и TypeScript.</div>
            <div>Адаптивная вёрстка, архитектура проекта.</div>
            <div>Быстрый запуск.</div>
          </div>

          <div style={{ marginTop: 46, display: "flex", gap: 24 }}>
            <div
              style={{
                height: 62,
                minWidth: 210,
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(92,225,230,.42)",
                borderRadius: 999,
                color: "#ecfbff",
                background: "rgba(16,52,68,.86)",
                fontSize: 18,
                fontWeight: 780,
              }}
            >
              Прайс-лист ↗
            </div>
            <div
              style={{
                height: 62,
                minWidth: 170,
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(92,225,230,.22)",
                borderRadius: 999,
                color: "rgba(255,255,255,.9)",
                background: "rgba(255,255,255,.035)",
                fontSize: 18,
                fontWeight: 780,
              }}
            >
              Портфолио
            </div>
          </div>
        </div>
      </div>
  );
}

export default function Image() {
  return new ImageResponse(
    <OpenGraphImageMarkup />,
    size,
  );
}
