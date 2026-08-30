import type { Metadata } from "next";
import { ServiceSeoPage } from "@/components/seo/ServiceSeoPage";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;
const pageUrl = `${siteUrl}/react-frontend-razrabotka`;

export const metadata: Metadata = {
  title: "React frontend-разработка",
  description:
    "React frontend-разработка для бизнеса: лендинги, каталоги, карточки, фильтры, модальные окна, формы заявок и адаптивные интерфейсы.",
  alternates: {
    canonical: "/react-frontend-razrabotka",
  },
  openGraph: {
    title: "React frontend-разработка | OnixFrame",
    description:
      "Разработка frontend-интерфейсов на React: компоненты, состояния, карточки, фильтры, формы и адаптивная вёрстка.",
    url: "/react-frontend-razrabotka",
  },
  twitter: {
    card: "summary_large_image",
    title: "React frontend-разработка | OnixFrame",
    description:
      "Разработка frontend-интерфейсов на React: компоненты, состояния, карточки, фильтры, формы и адаптивная вёрстка.",
    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}/#service`,
  name: "React frontend-разработка",
  serviceType: "React-разработка",
  provider: { "@type": "ProfessionalService", name: "OnixFrame", url: siteUrl },
  areaServed: [{ "@type": "Country", name: "Беларусь" }, { "@type": "Place", name: "СНГ" }],
  description:
    "React frontend-разработка для бизнеса: лендинги, каталоги, карточки, фильтры, формы заявок и адаптивные интерфейсы.",
  offers: { "@type": "Offer", price: "1100", priceCurrency: "BYN", url: pageUrl },
};

export default function ReactFrontendDevelopmentPage() {
  return (
    <ServiceSeoPage
      backHref="/#pricing"
      backLabel="Вернуться к тарифам"
      eyebrow="React frontend-разработка"
      title="React-интерфейсы для сайтов, каталогов и страниц с интерактивной логикой"
      lead="Делаю frontend на React, когда сайту нужны компоненты, карточки, фильтры, модальные окна, состояния и более гибкая структура."
      price="от 1100 BYN"
      duration="от 7 рабочих дней"
      format="React + адаптивная компонентная структура"
      included={[
        "Компонентная структура React",
        "Каталоги, карточки, фильтры или модальные окна",
        "Адаптивная вёрстка под основные экраны",
        "Форма заявки с отправкой на email или в Telegram",
        "Базовые состояния интерфейса и hover-эффекты",
        "Подготовка проекта к деплою на Vercel",
      ]}
      audienceTitle="Для проектов, где обычной статичной страницы уже мало"
      audienceText={[
        "React подходит, когда на сайте есть повторяемые карточки, переключатели, фильтры, модальные окна, формы, состояния и другие интерактивные элементы.",
        "Такой формат удобен для каталогов услуг, портфолио, промо-страниц продукта и интерфейсов, которые будут развиваться дальше.",
      ]}
      faq={[
        {
          question: "Когда нужен React, а когда достаточно HTML/CSS/JS?",
          answer:
            "Если страница простая и статичная, часто достаточно HTML/CSS/JS. React нужен, когда появляется компонентная логика, состояния, фильтры, карточки и более сложные сценарии.",
        },
        {
          question: "Можно ли потом перейти с React на Next.js?",
          answer:
            "Да. Если проект вырастет и понадобится SEO-структура, маршруты, страницы или серверная логика, его можно развивать в сторону Next.js.",
        },
        {
          question: "React подходит для лендинга?",
          answer:
            "Да, если лендинг содержит интерактивные блоки, каталог, фильтры, квизы, модальные окна или будет масштабироваться.",
        },
      ]}
      structuredData={structuredData}
    />
  );
}
