"use client";

import { Check, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/Button";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./Pricing.module.css";

type Plan = {
  title: string;
  price: string;
  badge: string;
  description: string;
  includes: string[];
  featured?: boolean;
  duration: string;
  baseVolume: string;
  extraPrice: string;
  fitsFor: string;
  additional: string[];
};

const plans: Plan[] = [
  {
    title: "HTML / CSS / JS Landing",
    price: "от 8 000 ₽",
    badge: "Базовый сайт",
    description: "Подходит для простого лендинга, портфолио, визитки или промо-страницы без сложной логики.",
    fitsFor: "Небольшой коммерческий сайт, промо-страница услуги или презентация продукта без backend-интеграций.",
    duration: "3–5 рабочих дней",
    baseVolume: "до 5 секций",
    extraPrice: "+1 500 ₽ за секцию",
    includes: [
      "Верстка до 5 секций",
      "Адаптив под телефон, планшет и desktop",
      "Чистый HTML, CSS и JavaScript",
      "Базовые hover-эффекты и плавные анимации",
      "Форма без backend-интеграции",
      "Подготовка к загрузке на Vercel или GitHub Pages",
      "Аккуратная структура файлов",
      "Базовая оптимизация изображений"
    ],
    additional: [
      "Каждая дополнительная секция: +1 500 ₽",
      "Сложная анимация: обсуждается отдельно",
      "Форма с отправкой в Telegram/email: отдельно"
    ]
  },
  {
    title: "React Landing / Website",
    price: "от 15 000 ₽",
    badge: "Популярный",
    description: "Подходит для сайта с компонентами, состояниями, фильтрами, карточками, каталогом и более гибкой структурой.",
    fitsFor: "Компаниям и продуктам, которым нужен современный frontend на React с интерактивными секциями и логикой.",
    duration: "7–14 рабочих дней",
    baseVolume: "до 7 секций",
    extraPrice: "+2 000 ₽ за секцию",
    includes: [
      "React + Vite",
      "Компонентная структура",
      "До 7 экранов или секций",
      "Каталог, карточки или модальные окна",
      "Адаптивная верстка",
      "Базовая интерактивность",
      "Анимации появления и hover-эффекты",
      "Подготовка проекта к деплою на Vercel",
      "Чистая структура компонентов",
      "Базовая оптимизация интерфейса"
    ],
    additional: [
      "Каждая дополнительная секция: +2 000 ₽",
      "Фильтры/поиск/сортировка: отдельно",
      "Сложные состояния интерфейса: отдельно",
      "Интеграция API: отдельно",
      "Личный кабинет или админ-панель: отдельно"
    ],
    featured: true
  },
  {
    title: "Next.js + TypeScript",
    price: "от 25 000 ₽",
    badge: "Продвинутый",
    description: "Подходит для современного сайта, портфолио-хаба, каталога проектов или коммерческого frontend-приложения.",
    fitsFor: "Бизнесам и стартапам, которым нужен мощный Next.js проект с SEO, страницами и архитектурой для роста.",
    duration: "14–30 рабочих дней",
    baseVolume: "до 8 секций или страниц",
    extraPrice: "+3 000 ₽ за секцию или страницу",
    includes: [
      "Next.js + TypeScript",
      "Страницы, компоненты и данные",
      "SEO-структура и meta-теги",
      "Каталог проектов, услуг или кейсов",
      "Базовая оптимизация скорости",
      "Деплой на Vercel",
      "Настройка структуры проекта",
      "Адаптивная верстка",
      "Чистая архитектура компонентов",
      "Подготовка проекта к дальнейшему развитию"
    ],
    additional: [
      "Каждая дополнительная секция или страница: +3 000 ₽",
      "Подключение CMS: отдельно",
      "Авторизация/личный кабинет: отдельно",
      "Интеграция базы данных: отдельно",
      "Сложная backend-логика: отдельно",
      "Многоязычность: отдельно",
      "Advanced SEO: отдельно"
    ]
  }
];

export function Pricing() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const openPlan = (plan: Plan) => setActivePlan(plan);
  const closePlan = () => setActivePlan(null);

  const selectedPlan = useMemo(() => activePlan, [activePlan]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (selectedPlan) {
      document.body.dataset.pricingModalOpen = "true";
      document.body.style.overflow = "hidden";
    } else {
      delete document.body.dataset.pricingModalOpen;
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      delete document.body.dataset.pricingModalOpen;
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPlan]);

  return (
    <section id="pricing" className={sectionStyles.sectionBlock}>
      <div className={`${sectionStyles.sectionHeader} ${styles.pricingHeader}`}>
        <div>
          <h2>Прайс на разработку сайтов.</h2>
          <p>
            Пакеты созданы как быстрый выбор с деталями внутри. После клика вы увидите сроки,
            базовый объём и доплаты за дополнительные секции.
          </p>
        </div>
      </div>

      <div className={styles.pricingGrid}>
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`${styles.priceCard} ${plan.featured ? styles.priceCardFeatured : ''} ${styles.clickable}`}
            role="button"
            tabIndex={0}
            onClick={() => openPlan(plan)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPlan(plan);
              }
            }}
          >
            <div className={styles.priceTop}>
              <span className={styles.priceBadge}>
                <Sparkles size={14} />
                {plan.badge}
              </span>
              <h3>{plan.title}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.description}</p>
            </div>

            <ul className={styles.priceList}>
              {plan.includes.slice(0, 5).map((item) => (
                <li key={item}>
                  <Check size={17} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.featured ? 'priceFeatured' : 'price'}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openPlan(plan);
              }}
            >
              Подробнее
            </Button>
          </article>
        ))}
      </div>

      {selectedPlan ? (
        <div className={styles.pricingModalOverlay} onClick={closePlan}>
          <div
            className={styles.pricingModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className={styles.modalClose} type="button" onClick={closePlan} aria-label="Закрыть">
              <X size={18} />
            </button>

            <div className={styles.modalHeader}>
              <span className={`${styles.priceBadge} ${styles.modalBadge}`}>{selectedPlan.badge}</span>
              <h3 id="pricing-modal-title">{selectedPlan.title}</h3>
              <strong>{selectedPlan.price}</strong>
              <p>{selectedPlan.description}</p>

              <div className={styles.modalMeta}>
                <span className={styles.modalBadge}>Срок: {selectedPlan.duration}</span>
                <span className={styles.modalBadge}>Базовый объём: {selectedPlan.baseVolume}</span>
                <span className={styles.modalBadge}>Дополнительно: {selectedPlan.extraPrice}</span>
              </div>
            </div>

            <div className={styles.modalSection}>
              <h4>Кому подходит</h4>
              <p>{selectedPlan.fitsFor}</p>
            </div>

            <div className={styles.modalSection}>
              <h4>Что входит</h4>
              <ul>
                {selectedPlan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.modalSection}>
              <h4>Сроки и объём</h4>
              <ul>
                <li>Базовый объём: {selectedPlan.baseVolume}</li>
                <li>Дополнительная секция: {selectedPlan.extraPrice}</li>
                <li>Срок выполнения: {selectedPlan.duration}</li>
              </ul>
            </div>

            <div className={styles.modalSection}>
              <h4>Дополнительно</h4>
              <ul>
                {selectedPlan.additional.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <Button variant="modal" href="mailto:hello@example.com">
              Обсудить проект
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
