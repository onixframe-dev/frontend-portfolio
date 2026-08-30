import type { Metadata } from "next";
import { ServiceSeoPage } from "@/components/seo/ServiceSeoPage";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;
const pageUrl = `${siteUrl}/sait-vizitka-dlya-biznesa`;

export const metadata: Metadata = {
  title: "Сайт-визитка для бизнеса",
  description:
    "Разработка сайта-визитки для бизнеса в Беларуси: адаптивная страница, услуги, контакты, форма заявки, базовое SEO и подготовка к запуску.",
  alternates: {
    canonical: "/sait-vizitka-dlya-biznesa",
  },
  openGraph: {
    title: "Сайт-визитка для бизнеса | OnixFrame",
    description:
      "Сайт-визитка для малого бизнеса, эксперта или локальной компании: структура, вёрстка, контакты и форма заявки.",
    url: "/sait-vizitka-dlya-biznesa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Сайт-визитка для бизнеса | OnixFrame",
    description:
      "Сайт-визитка для малого бизнеса, эксперта или локальной компании: структура, вёрстка, контакты и форма заявки.",
    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}/#service`,
  name: "Сайт-визитка для бизнеса",
  serviceType: "Разработка сайта-визитки",
  provider: { "@type": "ProfessionalService", name: "OnixFrame", url: siteUrl },
  areaServed: [{ "@type": "Country", name: "Беларусь" }, { "@type": "Place", name: "СНГ" }],
  description:
    "Разработка адаптивных сайтов-визиток для бизнеса в Беларуси: услуги, контакты, форма заявки, базовое SEO.",
  offers: { "@type": "Offer", price: "600", priceCurrency: "BYN", url: pageUrl },
};

export default function BusinessCardWebsitePage() {
  return (
    <ServiceSeoPage
      backHref="/#pricing"
      backLabel="Вернуться к тарифам"
      eyebrow="Сайт-визитка для бизнеса"
      title="Сайт-визитка, который быстро объясняет кто вы, что предлагаете и как с вами связаться"
      lead="Подходит для малого бизнеса, услуг, экспертов и локальных компаний, которым нужна понятная онлайн-презентация без сложной логики."
      price="от 600 BYN"
      duration="от 5 рабочих дней"
      format="по макету, референсам или визуальной концепции"
      included={[
        "Главная структура: первый экран, услуги, преимущества, контакты",
        "Адаптивная вёрстка под телефон, планшет и desktop",
        "Форма заявки с отправкой на email или в Telegram",
        "Базовые meta-теги и Open Graph для ссылок",
        "Подготовка к публикации на Vercel",
        "Аккуратная структура файлов и изображений",
      ]}
      audienceTitle="Для компаний и специалистов, которым нужен простой сайт без лишней сложности"
      audienceText={[
        "Сайт-визитка помогает быстро показать услугу, контакты, преимущества, фотографии или примеры работ. Это хороший формат для первого сайта бизнеса.",
        "Если позже понадобится каталог, блог, CMS или личный кабинет, структуру можно развивать дальше на React или Next.js.",
      ]}
      faq={[
        {
          question: "Чем сайт-визитка отличается от лендинга?",
          answer:
            "Сайт-визитка чаще короче и спокойнее: она представляет бизнес, услуги и контакты. Лендинг сильнее заточен под конкретную продажу или одну услугу.",
        },
        {
          question: "Можно ли сделать сайт без готового дизайна?",
          answer:
            "Да. Можно работать по референсам и согласованной визуальной концепции. Полноценный дизайн-макет в Figma считается отдельно.",
        },
        {
          question: "Можно ли добавить Telegram-заявки?",
          answer: "Да. Форму можно подключить к Telegram, чтобы обращения сразу приходили в чат или группу.",
        },
      ]}
      structuredData={structuredData}
    />
  );
}
