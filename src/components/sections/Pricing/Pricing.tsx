"use client";

import { Check, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./Pricing.module.css";

type Currency = "BYN" | "USD";

type Plan = {
  title: string;
  priceByn: number;
  badge: string;
  badgeTone: "starter" | "popular" | "advanced";
  description: string;
  includes: string[];
  featured?: boolean;
  duration: string;
  baseVolume: string;
  extraPriceByn: number;
  extraUnit: string;
  fitsFor: string;
  additional: string[];
};

type RateState = {
  rate: number | null;
  date: string | null;
  status: "loading" | "ready" | "error";
};

const plans: Plan[] = [
  {
    title: "HTML / CSS / JS Landing",
    priceByn: 600,
    badge: "Базовый сайт",
    badgeTone: "starter",
    description: "Подходит для простого лендинга, портфолио, сайта-визитки или промо-страницы без сложной логики.",
    fitsFor: "Небольшой коммерческий сайт, промо-страница услуги или презентация продукта без backend-интеграций.",
    duration: "3–5 рабочих дней",
    baseVolume: "до 5 секций",
    extraPriceByn: 120,
    extraUnit: "за секцию",
    includes: [
      "Вёрстка до 5 секций",
      "Адаптив под телефон, планшет и desktop",
      "Чистый HTML, CSS и JavaScript",
      "Базовые hover-эффекты и плавные анимации",
      "Форма без backend-интеграции",
      "Подготовка к загрузке на Vercel или GitHub Pages",
      "Аккуратная структура файлов",
      "Базовая оптимизация изображений"
    ],
    additional: [
      "Сложность и объём фиксируются перед стартом.",
      "Сложная анимация обсуждается отдельно.",
      "Форма с отправкой в Telegram или email обсуждается отдельно."
    ]
  },
  {
    title: "React Landing / Website",
    priceByn: 1100,
    badge: "Популярный",
    badgeTone: "popular",
    description: "Подходит для сайта с компонентами, состояниями, фильтрами, карточками, каталогом и более гибкой структурой.",
    fitsFor: "Компаниям и продуктам, которым нужен современный React-frontend с интерактивными секциями и логикой.",
    duration: "7–14 рабочих дней",
    baseVolume: "до 7 секций",
    extraPriceByn: 180,
    extraUnit: "за секцию",
    includes: [
      "React + Vite",
      "Компонентная структура",
      "До 7 экранов или секций",
      "Каталог, карточки или модальные окна",
      "Адаптивная вёрстка",
      "Базовая интерактивность",
      "Анимации появления и hover-эффекты",
      "Подготовка проекта к деплою на Vercel",
      "Чистая структура компонентов",
      "Базовая оптимизация интерфейса"
    ],
    additional: [
      "Дополнительные секции считаются по тарифу пакета.",
      "Фильтры, поиск и сортировка обсуждаются отдельно.",
      "Сложные состояния интерфейса обсуждаются отдельно.",
      "Интеграция API обсуждается отдельно.",
      "Личный кабинет или админ-панель обсуждаются отдельно."
    ],
    featured: true
  },
  {
    title: "Next.js + TypeScript",
    priceByn: 1700,
    badge: "Продвинутый",
    badgeTone: "advanced",
    description: "Подходит для современного сайта, портфолио-хаба, каталога проектов или коммерческого frontend-приложения.",
    fitsFor: "Бизнесу и стартапам, которым нужен мощный Next.js-проект с SEO, страницами и архитектурой для роста.",
    duration: "14–30 рабочих дней",
    baseVolume: "до 8 секций или страниц",
    extraPriceByn: 250,
    extraUnit: "за секцию или страницу",
    includes: [
      "Next.js + TypeScript",
      "Страницы, компоненты и данные",
      "SEO-структура и meta-теги",
      "Каталог проектов, услуг или кейсов",
      "Базовая оптимизация скорости",
      "Деплой на Vercel",
      "Настройка структуры проекта",
      "Адаптивная вёрстка",
      "Чистая архитектура компонентов",
      "Подготовка проекта к дальнейшему развитию"
    ],
    additional: [
      "Дополнительные секции и страницы считаются по тарифу пакета.",
      "Подключение CMS обсуждается отдельно.",
      "Авторизация или личный кабинет обсуждаются отдельно.",
      "Интеграция базы данных обсуждается отдельно.",
      "Сложная backend-логика обсуждается отдельно.",
      "Многоязычность обсуждается отдельно.",
      "Расширенное SEO обсуждается отдельно."
    ]
  }
];

const bynFormatter = new Intl.NumberFormat("ru-BY", {
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function Pricing() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [currency, setCurrency] = useState<Currency>("BYN");
  const [rateState, setRateState] = useState<RateState>({
    rate: null,
    date: null,
    status: "loading",
  });

  const openPlan = (plan: Plan) => setActivePlan(plan);
  const closePlan = () => setActivePlan(null);

  const selectedPlan = activePlan;
  const isModalOpen = Boolean(selectedPlan);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRate() {
      try {
        const response = await fetch("/api/rates/usd", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Rate request failed");
        }

        const data = (await response.json()) as { rate: number; date: string };

        setRateState({
          rate: data.rate,
          date: data.date,
          status: "ready",
        });
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setRateState({
          rate: null,
          date: null,
          status: "error",
        });
      }
    }

    loadRate();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    if (isModalOpen) {
      document.body.dataset.pricingModalOpen = "true";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const lockedTop = document.body.style.top;
      delete document.body.dataset.pricingModalOpen;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;

      if (lockedTop) {
        window.scrollTo(0, Math.abs(parseInt(lockedTop, 10)));
      }
    }

    return () => {
      const lockedTop = document.body.style.top;
      delete document.body.dataset.pricingModalOpen;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;

      if (lockedTop) {
        window.scrollTo(0, Math.abs(parseInt(lockedTop, 10)));
      }
    };
  }, [isModalOpen]);

  const formatPrice = (amountByn: number, prefix = "от ") => {
    if (currency === "BYN") {
      return `${prefix}${bynFormatter.format(amountByn)} Br`;
    }

    if (!rateState.rate) {
      return "курс загружается";
    }

    return `${prefix}$${usdFormatter.format(amountByn / rateState.rate)}`;
  };

  const formatBynPrice = (amountByn: number, prefix = "от ") => `${prefix}${bynFormatter.format(amountByn)} Br`;

  const formatUsdPrice = (amountByn: number, prefix = "") => {
    if (!rateState.rate) {
      return "USD загружается";
    }

    return `${prefix}$${usdFormatter.format(amountByn / rateState.rate)}`;
  };

  const formatDualPrice = (amountByn: number, prefix = "от ") => {
    const usdPrefix = prefix.trim() === "+" ? "+" : "";
    return `${formatBynPrice(amountByn, prefix)} / ${formatUsdPrice(amountByn, usdPrefix)}`;
  };

  const formatDualExtraPrice = (plan: Plan) => `${formatDualPrice(plan.extraPriceByn, "+")} ${plan.extraUnit}`;

  const rateLabel =
    rateState.status === "ready" && rateState.rate
      ? `Курс НБРБ: 1 USD = ${rateState.rate.toFixed(4)} Br`
      : rateState.status === "loading"
        ? "Загружаю курс НБРБ."
        : "Курс НБРБ временно недоступен.";

  return (
    <section
      id="pricing"
      className={`${sectionStyles.sectionBlock} ${isModalOpen ? styles.pricingModalRootOpen : ""}`}
    >
      <div className={`${sectionStyles.sectionHeader} ${styles.pricingHeader}`}>
        <div>
          <AnimatedTitle>Прайс на разработку сайтов</AnimatedTitle>
          <SectionSubtitle>
            Пакеты помогают быстро выбрать формат разработки.
            <br />
            В карточках указаны сроки, базовый объём и доплаты за секции.
          </SectionSubtitle>
        </div>
        <div className={styles.currencyPanel}>
          <div className={styles.currencyToggle} role="group" aria-label="Валюта прайса">
            <button
              type="button"
              className={`${styles.currencyButton} ${currency === "BYN" ? styles.currencyButtonActive : ""}`}
              onClick={() => setCurrency("BYN")}
              aria-pressed={currency === "BYN"}
            >
              BYN
            </button>
            <button
              type="button"
              className={`${styles.currencyButton} ${currency === "USD" ? styles.currencyButtonActive : ""}`}
              onClick={() => setCurrency("USD")}
              aria-pressed={currency === "USD"}
            >
              USD
            </button>
          </div>
          <span className={styles.rateNote}>{rateLabel}</span>
        </div>
      </div>

      <div className={styles.pricingGrid}>
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`${styles.priceCard} ${styles[`priceCard${plan.badgeTone}`]} ${
              plan.featured ? styles.priceCardFeatured : ""
            } ${styles.clickable}`}
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
              <span className={`${styles.priceBadge} ${styles[`priceBadge${plan.badgeTone}`]}`}>
                <Sparkles size={14} />
                {plan.badge}
              </span>
              <h3>{plan.title}</h3>
              <strong
                key={`${plan.title}-${currency}-${rateState.rate ?? "pending"}`}
                className={`${styles.priceValue} ${
                  currency === "USD" ? styles.priceValueUsd : styles.priceValueByn
                }`}
              >
                {formatPrice(plan.priceByn)}
              </strong>
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

      <p className={styles.paymentNote}>Условия оплаты и этапы работы обсуждаются после оценки проекта.</p>

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

            <div className={styles.modalScrollArea}>
              <div className={styles.modalPlanSwitcher} role="tablist" aria-label="Тарифы">
                {plans.map((plan, index) => (
                  <button
                    key={plan.title}
                    type="button"
                    className={`${styles.modalPlanTab} ${
                      selectedPlan.title === plan.title ? styles.modalPlanTabActive : ""
                    }`}
                    onClick={() => setActivePlan(plan)}
                    role="tab"
                    aria-selected={selectedPlan.title === plan.title}
                  >
                    <span>{plan.badge}</span>
                    <small>{index + 1}</small>
                  </button>
                ))}
              </div>

              <div className={styles.modalHeader} key={selectedPlan.title}>
                <span className={`${styles.priceBadge} ${styles[`priceBadge${selectedPlan.badgeTone}`]} ${styles.modalBadge}`}>
                  {selectedPlan.badge}
                </span>
                <h3 id="pricing-modal-title">{selectedPlan.title}</h3>
                <strong
                  key={`modal-${selectedPlan.title}-${rateState.rate ?? "pending"}`}
                  className={`${styles.priceValue} ${styles.priceValueByn} ${styles.modalDualPrice}`}
                >
                  {formatDualPrice(selectedPlan.priceByn)}
                </strong>
                <p>{selectedPlan.description}</p>

                <div className={styles.modalMeta}>
                  <span className={styles.modalBadge}>Срок: {selectedPlan.duration}</span>
                  <span className={styles.modalBadge}>Базовый объём: {selectedPlan.baseVolume}</span>
                  <span className={styles.modalBadge}>Дополнительно: {formatDualExtraPrice(selectedPlan)}</span>
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
                  <li>Дополнительная секция: {formatDualExtraPrice(selectedPlan)}</li>
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

              <Button variant="modal" href="mailto:onixframe.dev@gmail.com">
                Обсудить проект
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
