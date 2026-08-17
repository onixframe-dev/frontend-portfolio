import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OnixFrame — разработка сайтов и интерфейсов",
  description: "Разработка современных сайтов, лендингов, каталогов и frontend-интерфейсов на HTML, CSS, JavaScript, React, Next.js и TypeScript.",
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
  other: {
    "color-scheme": "dark only",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <div className="siteContent">{children}</div>
      </body>
    </html>
  );
}
