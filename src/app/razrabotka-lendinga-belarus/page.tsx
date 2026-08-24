import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, FileText, MessagesSquare, SearchCheck } from "lucide-react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Button } from "@/components/ui/Button";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";
import styles from "./landing.module.css";

const siteUrl = SITE_URL;
const pageUrl = `${siteUrl}/razrabotka-lendinga-belarus`;

export const metadata: Metadata = {
  title: "Разработка лендингов в Беларуси",
  description:
    "Разработка лендингов для бизнеса в Беларуси: адаптивная вёрстка, React или Next.js, форма заявки, базовое SEO, подключение Telegram и подготовка к запуску.",
  alternates: {
    canonical: "/razrabotka-lendinga-belarus",
  },
  openGraph: {
    title: "Разработка лендингов в Беларуси | OnixFrame",
    description:
      "Лендинги, сайты-визитки и frontend-интерфейсы для бизнеса на React, Next.js и TypeScript.",
    url: "/razrabotka-lendinga-belarus",
  },
  twitter: {
    title: "Разработка лендингов в Беларуси | OnixFrame",
    description:
      "Адаптивные лендинги для бизнеса в Беларуси: структура, вёрстка, форма заявки, базовое SEO и запуск.",
  },
};

const included = [
  "адаптивная вёрстка под телефон, планшет и desktop",
  "структура страницы под услугу, продукт или личный бренд",
  "форма заявки с отправкой на email или в Telegram",
  "базовые meta-теги, Open Graph и техническая SEO-структура",
  "подготовка проекта к публикации на Vercel",
  "аккуратная структура компонентов и файлов",
];

const steps = [
  {
    title: "Разбираю задачу",
    text: "Смотрю нишу, цель страницы, референсы, материалы и то, какое действие должен сделать посетитель.",
  },
  {
    title: "Собираю структуру",
    text: "Выстраиваю блоки: первый экран, выгоды, услуги, кейсы, цены, ответы на вопросы и заявку.",
  },
  {
    title: "Верстаю и подключаю",
    text: "Делаю адаптивный frontend, форму заявки, Telegram/email-уведомления и базовую SEO-настройку.",
  },
  {
    title: "Готовлю запуск",
    text: "Проверяю мобильную версию, сборку, метаданные, скорость загрузки и деплой.",
  },
];

const faq = [
  {
    question: "Можно ли заказать лендинг без готового дизайна?",
    answer:
      "Да. Полноценный дизайн-макет в Figma не входит в базовую стоимость, но можно сделать страницу по референсам или согласованной визуальной концепции.",
  },
  {
    question: "Сколько стоит разработка лендинга?",
    answer:
      "Базовый HTML/CSS/JS лендинг начинается от 600 BYN. Если нужен React, каталог, фильтры, Next.js, CMS или расширенное SEO, стоимость считается по объёму.",
  },
  {
    question: "Работаете ли вы с заказчиками не из Минска?",
    answer:
      "Да. Работаю удалённо с заказчиками по всей Беларуси и СНГ: обсуждение, материалы, согласования и запуск можно вести онлайн.",
  },
  {
    question: "Можно ли получать заявки с сайта в Telegram?",
    answer:
      "Да. Форму можно подключить к Telegram-группе или личному чату, чтобы заявки сразу приходили в удобном формате.",
  },
];

const serviceLinks = [
  {
    href: "/sait-vizitka-dlya-biznesa",
    title: "Лендинг и сайт-визитка",
    text: "Страница для презентации услуги, компании, контактов и получения заявок.",
  },
  {
    href: "/react-frontend-razrabotka",
    title: "React frontend-разработка",
    text: "Интерфейсы с компонентами, карточками, фильтрами и интерактивной логикой.",
  },
  {
    href: "/nextjs-sait-pod-kluch",
    title: "Next.js сайт под ключ",
    text: "SEO-структура, страницы, TypeScript, Vercel и база для развития проекта.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}/#service`,
  name: "Разработка лендингов в Беларуси",
  serviceType: "Разработка лендингов",
  provider: {
    "@type": "ProfessionalService",
    name: "OnixFrame",
    url: siteUrl,
  },
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
  description:
    "Разработка лендингов, сайтов-визиток и frontend-интерфейсов для бизнеса в Беларуси на React, Next.js, TypeScript, HTML, CSS и JavaScript.",
  offers: {
    "@type": "Offer",
    price: "600",
    priceCurrency: "BYN",
    availability: "https://schema.org/InStock",
    url: pageUrl,
  },
};

export default function LandingDevelopmentBelarusPage() {
  return (
    <main>
      <Header />
      <div className="starryRegion">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <a className={styles.backLink} href="/">
                <ArrowLeft size={16} />
                На главную
              </a>
              <p className={styles.eyebrow}>Сайты и лендинги для бизнеса</p>
              <h1>Создаю сайты, которые понятно показывают ваш бизнес и приводят заявки</h1>
              <p className={styles.lead}>
                Делаю адаптивные лендинги, сайты-визитки и frontend-интерфейсы на HTML, CSS,
                JavaScript, React, Next.js и TypeScript. Работаю с заказчиками по всей Беларуси и СНГ.
              </p>
              <div className={styles.actions}>
                <Button href="/brief" variant="priceFeatured">
                  Заполнить заявку <ArrowRight size={17} />
                </Button>
                <Button href="/#pricing" variant="ghost">
                  Смотреть цены
                </Button>
              </div>
            </div>

            <aside className={styles.summary} aria-label="Кратко об услуге">
              <div>
                <span>Стоимость</span>
                <strong>от 600 BYN</strong>
              </div>
              <div>
                <span>Срок</span>
                <strong>от 5 рабочих дней</strong>
              </div>
              <div>
                <span>Формат</span>
                <strong>по макету, референсам или визуальной концепции</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Что входит</p>
            <h2>Лендинг собирается не только как красивая страница, а как понятный путь к заявке</h2>
          </div>
          <div className={styles.featuresGrid}>
            {included.map((item) => (
              <div className={styles.feature} key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.split}>
            <div>
              <p className={styles.eyebrow}>Кому подходит</p>
              <h2>Для услуг, малого бизнеса, экспертов, локальных компаний и новых продуктов</h2>
            </div>
            <div className={styles.textBlock}>
              <p>
                Лендинг подходит, когда нужно быстро объяснить предложение, показать преимущества,
                ответить на частые вопросы и привести человека к заявке. Это может быть страница
                услуги, промо-страница, сайт-визитка, портфолио или первый сайт для проверки спроса.
              </p>
              <p>
                Если у вас уже есть дизайн, я сверстаю по макету. Если дизайна нет, можно работать
                от референсов и согласовать визуальную концепцию без полноценного UI/UX-макета.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Процесс</p>
            <h2>Как проходит работа</h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <article className={styles.stepCard} key={step.title}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <Clock3 size={22} />
              <h3>Сроки</h3>
              <p>Простой лендинг обычно занимает от 5 рабочих дней после согласования материалов. Точный срок зависит от объёма проекта, готовности материалов и количества необходимых интеграций.</p>
            </article>
            <article className={styles.infoCard}>
              <SearchCheck size={22} />
              <h3>SEO</h3>
              <p>Добавляю базовые meta-теги, Open Graph, sitemap, robots и понятную структуру заголовков.</p>
            </article>
            <article className={styles.infoCard}>
              <MessagesSquare size={22} />
              <h3>Заявки</h3>
              <p>Форму можно подключить к email и Telegram, чтобы заявки не терялись.</p>
            </article>
            <article className={styles.infoCard}>
              <FileText size={22} />
              <h3>Материалы</h3>
              <p>Лучше заранее подготовить текст, фото, контакты, референсы и список нужных блоков.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Направления</p>
            <h2>Отдельные услуги, которые можно собрать под задачу вашего бизнеса</h2>
          </div>
          <div className={styles.serviceLinksGrid}>
            {serviceLinks.map((service) => (
              <a className={styles.serviceLinkCard} href={service.href} key={service.href}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <strong>
                  Подробнее <ArrowRight size={16} />
                </strong>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2>Частые вопросы перед заказом лендинга</h2>
          </div>
          <div className={styles.faqList}>
            {faq.map((item) => (
              <details className={styles.faqItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <div>
              <p className={styles.eyebrow}>Оценка проекта</p>
              <h2>Опишите задачу, и я подскажу формат, сроки и примерную стоимость</h2>
            </div>
            <Button href="/brief" variant="priceFeatured">
              Заполнить заявку <ArrowRight size={17} />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
