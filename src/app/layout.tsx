import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const siteUrl = SITE_URL;
const siteName = "OnixFrame";
const siteDescription =
  "Разработка сайтов, лендингов и frontend-интерфейсов для бизнеса: React, Next.js, адаптивная вёрстка, формы заявок и подготовка к запуску. Работаю с клиентами из Беларуси, СНГ и других стран.";
const ogImage = "/opengraph-image.png";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Разработка сайтов и frontend-интерфейсов для бизнеса | OnixFrame",
    template: "%s | OnixFrame",
  },
  description: siteDescription,
  authors: [{ name: "OnixFrame", url: siteUrl }],
  creator: "OnixFrame",
  publisher: "OnixFrame",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Разработка сайтов и frontend-интерфейсов для бизнеса | OnixFrame",
    description: siteDescription,
    url: "/",
    siteName,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "OnixFrame — разработка сайтов и frontend-интерфейсов для бизнеса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Разработка сайтов и frontend-интерфейсов для бизнеса | OnixFrame",
    description: siteDescription,
    images: [ogImage],
  },
  appleWebApp: {
    title: siteName,
    capable: true,
    statusBarStyle: "black-translucent",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "color-scheme": "dark",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "ru-RU",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}${ogImage}`,
      description: siteDescription,
      email: "onixframe.dev@gmail.com",
      telephone: "+375296702546",
      sameAs: [
        "https://github.com/onixframe-dev",
        "https://www.instagram.com/igor_gordich/",
        "https://t.me/OnixFrame",
      ],
      slogan:
        "Frontend-разработчик для бизнеса в Беларуси. Работаю с заказчиками по всей Беларуси и СНГ.",
      areaServed: [
        {
          "@type": "Country",
          name: "Беларусь",
        },
        {
          "@type": "Place",
          name: "СНГ",
        },
      ],
      serviceType: [
        "Разработка лендингов",
        "Разработка сайтов-визиток",
        "Frontend-разработка",
        "React-разработка",
        "Next.js-разработка",
        "Адаптивная вёрстка",
      ],
      offers: {
        "@type": "OfferCatalog",
        name: "Услуги разработки сайтов",
        itemListElement: [
          {
            "@type": "Offer",
            name: "HTML / CSS / JS Landing",
            price: "600",
            priceCurrency: "BYN",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "React Landing / Website",
            price: "1100",
            priceCurrency: "BYN",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Next.js + TypeScript",
            price: "1700",
            priceCurrency: "BYN",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="siteContent">{children}</div>
      </body>
    </html>
  );
}
