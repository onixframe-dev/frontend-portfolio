import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OnixFrame — разработка сайтов и интерфейсов",
    short_name: "OnixFrame",
    description:
      "Frontend-разработчик для бизнеса в Беларуси и СНГ. Разработка лендингов, сайтов-визиток и frontend-интерфейсов на React, Next.js, TypeScript и адаптивной вёрстке.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "ru",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
