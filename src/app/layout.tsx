import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frontend-portfolio-ochre-six.vercel.app"),
  title: "OnixFrame — разработка сайтов и интерфейсов",
  description: "Разработка современных сайтов, лендингов, каталогов и frontend-интерфейсов на HTML, CSS, JavaScript, React, Next.js и TypeScript.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OnixFrame — разработка сайтов и интерфейсов",
    description: "Современные сайты, лендинги, каталоги и frontend-интерфейсы на HTML, CSS, JavaScript, React, Next.js и TypeScript.",
    url: "/",
    siteName: "OnixFrame",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "OnixFrame — разработка сайтов и интерфейсов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnixFrame — разработка сайтов и интерфейсов",
    description: "Современные сайты, лендинги, каталоги и frontend-интерфейсы на HTML, CSS, JavaScript, React, Next.js и TypeScript.",
    images: ["/opengraph-image.png"],
  },
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
