import type { Metadata } from "next";
import { ServiceSeoPage } from "@/components/seo/ServiceSeoPage";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;
const pageUrl = `${siteUrl}/telegram-zayavki-formy`;

export const metadata: Metadata = {
  title: "Подключение Telegram-заявок и форм",
  description:
    "Подключение форм заявки к Telegram и email: сообщения с сайта, брифы, уведомления, статусы заявок и удобный формат для бизнеса.",
  alternates: {
    canonical: "/telegram-zayavki-formy",
  },
  openGraph: {
    title: "Подключение Telegram-заявок и форм | OnixFrame",
    description:
      "Формы заявок для сайта с отправкой в Telegram-группу или email, удобный формат сообщений и базовая обработка ошибок.",
    url: "/telegram-zayavki-formy",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}/#service`,
  name: "Подключение Telegram-заявок и форм",
  serviceType: "Интеграция форм заявки",
  provider: { "@type": "ProfessionalService", name: "OnixFrame", url: siteUrl },
  areaServed: [{ "@type": "Country", name: "Беларусь" }, { "@type": "Place", name: "СНГ" }],
  description:
    "Подключение форм сайта к Telegram и email: заявки, брифы, уведомления, статусы и удобный формат сообщений.",
  offers: { "@type": "Offer", price: "300", priceCurrency: "BYN", url: pageUrl },
};

export default function TelegramFormsPage() {
  return (
    <ServiceSeoPage
      eyebrow="Telegram-заявки и формы"
      title="Подключение форм, чтобы заявки с сайта сразу приходили в Telegram или email"
      lead="Настраиваю формы обратной связи, брифы и уведомления так, чтобы новые обращения не терялись и приходили в понятном формате."
      price="от 300 BYN"
      duration="обычно 1–3 рабочих дня"
      format="форма сайта + Telegram/email"
      included={[
        "форма сообщения или подробный бриф",
        "отправка заявки в Telegram-группу или личный чат",
        "email-уведомления при необходимости",
        "понятный формат сообщения с контактами и деталями проекта",
        "базовая валидация полей и обработка ошибок",
        "настройка переменных окружения для Vercel",
      ]}
      audienceTitle="Для сайтов, где важно быстро видеть новые обращения"
      audienceText={[
        "Telegram-заявки удобны, если вы не хотите постоянно проверять почту. Сообщение приходит в чат, где его можно сразу обсудить или взять в работу.",
        "Форму можно сделать простой или подробной: имя, Telegram, срок, тип сайта, бизнес-задача, пожелания и выбранный пакет.",
      ]}
      faq={[
        {
          question: "Лучше отправлять заявки в группу или в личные сообщения?",
          answer:
            "Если заявки обрабатывает несколько человек, удобнее группа. Если только один человек, можно отправлять в личный чат.",
        },
        {
          question: "Можно ли добавить статусы заявок?",
          answer:
            "Да. В Telegram можно сделать кнопки статусов: новая, закрыто, в работе. Это удобно для первичной обработки обращений.",
        },
        {
          question: "Нужно ли что-то настраивать на Vercel?",
          answer:
            "Да, для отправки нужны переменные окружения: токен Telegram-бота, chat id и при необходимости данные для email.",
        },
      ]}
      structuredData={structuredData}
    />
  );
}
