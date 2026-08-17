import type { Metadata } from "next";
import { ServiceSeoPage } from "@/components/seo/ServiceSeoPage";

const siteUrl = "https://frontend-portfolio-ochre-six.vercel.app";
const pageUrl = `${siteUrl}/nextjs-sait-pod-kluch`;

export const metadata: Metadata = {
  title: "Next.js сайт под ключ",
  description:
    "Разработка сайта на Next.js и TypeScript: SEO-структура, страницы, каталог услуг или проектов, формы заявок, Vercel и база для роста.",
  alternates: {
    canonical: "/nextjs-sait-pod-kluch",
  },
  openGraph: {
    title: "Next.js сайт под ключ | OnixFrame",
    description:
      "Next.js сайт для бизнеса: TypeScript, SEO-структура, страницы, формы, каталог и подготовка к развитию.",
    url: "/nextjs-sait-pod-kluch",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}/#service`,
  name: "Next.js сайт под ключ",
  serviceType: "Next.js-разработка",
  provider: { "@type": "ProfessionalService", name: "OnixFrame", url: siteUrl },
  areaServed: [{ "@type": "Country", name: "Беларусь" }, { "@type": "Place", name: "СНГ" }],
  description:
    "Разработка сайтов на Next.js и TypeScript: SEO-структура, страницы, каталог, формы заявок и деплой на Vercel.",
  offers: { "@type": "Offer", price: "1700", priceCurrency: "BYN", url: pageUrl },
};

export default function NextjsWebsitePage() {
  return (
    <ServiceSeoPage
      eyebrow="Next.js сайт под ключ"
      title="Next.js сайт для бизнеса с SEO-структурой, страницами и базой для роста"
      lead="Подходит для коммерческих сайтов, каталогов услуг, портфолио-хабов и проектов, которым важны скорость, структура и дальнейшее развитие."
      price="от 1700 BYN"
      duration="от 14–30 рабочих дней"
      format="Next.js + TypeScript + Vercel"
      included={[
        "Next.js + TypeScript",
        "страницы, компоненты и понятная структура проекта",
        "SEO-структура, meta-теги, sitemap и robots",
        "каталог услуг, проектов или кейсов",
        "форма заявки с отправкой на email или в Telegram",
        "деплой и подготовка проекта на Vercel",
      ]}
      audienceTitle="Для сайтов, которые должны не просто выглядеть, а расти дальше"
      audienceText={[
        "Next.js хорош для проектов, где нужны отдельные страницы, SEO, удобная архитектура, быстрый деплой и возможность добавлять новые разделы без хаоса.",
        "На такой базе можно позже подключать CMS, базу данных, авторизацию, личный кабинет, аналитику и более сложные интеграции.",
      ]}
      faq={[
        {
          question: "Когда стоит выбирать Next.js?",
          answer:
            "Когда важны SEO, отдельные страницы, структура проекта, скорость загрузки и дальнейшее развитие сайта.",
        },
        {
          question: "CMS входит в базовую стоимость?",
          answer:
            "Нет. CMS считается отдельно, потому что объём зависит от того, какие блоки и данные заказчик хочет редактировать.",
        },
        {
          question: "Можно ли подключить аналитику и формы?",
          answer:
            "Да. Можно подключить формы заявок, Telegram/email-уведомления, аналитику и дополнительные интеграции.",
        },
      ]}
      structuredData={structuredData}
    />
  );
}
