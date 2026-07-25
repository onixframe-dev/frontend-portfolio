"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Globe2,
  Layers3,
  Mail,
  MapPinned,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Button } from "@/components/ui/Button";
import styles from "./brief.module.css";

const steps = [
  { id: 1, label: "О бизнесе", icon: BriefcaseBusiness },
  { id: 2, label: "О сайте", icon: Sparkles },
  { id: 3, label: "Детали", icon: Code2 },
  { id: 4, label: "Контакты", icon: Send },
];

const moods = ["Минимализм", "Премиум", "Современный", "Технологичный", "Светлый", "Тёмный"];
const siteTypes = [
  { label: "Лендинг", icon: Rocket },
  { label: "Сайт-визитка", icon: FileText },
  { label: "Портфолио", icon: Layers3 },
  { label: "Другое", icon: Globe2 },
];

const packages = [
  {
    key: "html",
    name: "HTML / CSS / JS Landing",
    shortName: "HTML Landing",
    price: "от 8 000 ₽",
    deadline: "3–5 рабочих дней",
    note: "Лендинг, визитка или промо-страница без сложной логики.",
    icon: FileText,
  },
  {
    key: "react",
    name: "React Landing / Website",
    shortName: "React Website",
    price: "от 15 000 ₽",
    deadline: "7–14 рабочих дней",
    note: "Компоненты, карточки, фильтры, модальные окна и интерактивность.",
    icon: Layers3,
    popular: true,
  },
  {
    key: "next",
    name: "Next.js + TypeScript",
    shortName: "Next.js / TS",
    price: "от 25 000 ₽",
    deadline: "14–30 рабочих дней",
    note: "SEO, страницы, архитектура проекта и база для дальнейшего роста.",
    icon: Code2,
  },
];

const integrations = [
  { label: "Форма заявки", icon: Mail },
  { label: "Telegram", icon: Send },
  { label: "Онлайн-чат", icon: MessageCircle },
  { label: "Карта", icon: MapPinned },
  { label: "Аналитика", icon: BarChart3 },
  { label: "Ничего", icon: CheckCircle2 },
];

const deadlines = ["Как можно скорее", "3–5 дней", "1–2 недели", "2–4 недели", "Не срочно"];

export default function BriefPage() {
  const [step, setStep] = useState(1);
  const [isSent, setIsSent] = useState(false);
  const [values, setValues] = useState({
    projectName: "",
    business: "",
    audience: "",
    advantage: "",
    brandStyle: "Частично",
    inspiration: "",
    mood: moods[1],
    siteType: siteTypes[0].label,
    packageKey: "react",
    integrations: ["Форма заявки"],
    deadline: "Как можно скорее",
    contactName: "",
    contactContact: "",
    notes: "",
  });

  const handleToggleIntegration = (item: string) => {
    setValues((prev) => {
      if (item === "Ничего") return { ...prev, integrations: ["Ничего"] };

      const clean = prev.integrations.filter((value) => value !== "Ничего");
      const next = clean.includes(item) ? clean.filter((value) => value !== item) : [...clean, item];
      return { ...prev, integrations: next.length ? next : ["Ничего"] };
    });
  };

  const handleNextStep = () => setStep((s) => Math.min(4, s + 1));
  const handlePrevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    setIsSent(true);
  };

  return (
    <>
      <Header />
      <main className={styles.briefPage}>
        <div className={styles.container}>
          <Button variant="ghost" href="/" className={styles.backButton}>
            <ArrowLeft size={17} /> Вернуться на главную
          </Button>

          <header className={styles.header}>
            <span className={styles.kicker}>Бриф на разработку</span>
            <h1>Расскажите о проекте</h1>
            <p>Короткая анкета без лишней бюрократии. По ответам я пойму формат сайта, примерные сроки и объём работы.</p>
          </header>

          <div className={styles.navigation}>
            <div className={styles.tabs}>
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.tab} ${step === item.id ? styles.tabActive : ""}`}
                    onClick={() => setStep(item.id)}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className={styles.progressBar} aria-hidden="true">
              <div className={styles.progressFill} style={{ width: `${(step / steps.length) * 100}%` }} />
            </div>
          </div>

          <div className={styles.layout}>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              {isSent ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={styles.successBox}>
                  <CheckCircle2 size={38} />
                  <h2>Бриф собран</h2>
                  <p>Форма сейчас работает как frontend-заготовка. Следующим шагом можно подключить отправку в Telegram, email или CRM.</p>
                  <Button variant="primary" href="/">На главную</Button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={styles.formContent}
                >
                  {step === 1 && (
                    <div className={styles.stepContent}>
                      <Field label="Название проекта" htmlFor="projectName">
                        <input
                          id="projectName"
                          type="text"
                          placeholder="Например: студия маникюра LUNA, бренд одежды Nubo, личное портфолио"
                          value={values.projectName}
                          onChange={(e) => setValues({ ...values, projectName: e.target.value })}
                        />
                      </Field>

                      <Field label="Чем занимаетесь?" htmlFor="business">
                        <textarea
                          id="business"
                          placeholder="Например: продаём женскую одежду онлайн, делаем ремонт квартир, запускаем курс по дизайну"
                          rows={3}
                          value={values.business}
                          onChange={(e) => setValues({ ...values, business: e.target.value })}
                        />
                      </Field>

                      <Field label="Целевая аудитория" htmlFor="audience">
                        <input
                          id="audience"
                          type="text"
                          placeholder="Например: девушки 20–35 лет, малый бизнес, владельцы квартир после покупки"
                          value={values.audience}
                          onChange={(e) => setValues({ ...values, audience: e.target.value })}
                        />
                      </Field>

                      <Field label="Главное преимущество" htmlFor="advantage">
                        <input
                          id="advantage"
                          type="text"
                          placeholder="Например: быстро отвечаем, работаем под ключ, сильный визуал, честные сроки"
                          value={values.advantage}
                          onChange={(e) => setValues({ ...values, advantage: e.target.value })}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className={styles.stepContent}>
                      <ChoiceGroup label="Есть ли фирменный стиль?" columns="three">
                        {["Да", "Нет", "Частично"].map((item) => (
                          <Choice
                            key={item}
                            active={values.brandStyle === item}
                            onClick={() => setValues({ ...values, brandStyle: item })}
                          >
                            {item}
                          </Choice>
                        ))}
                      </ChoiceGroup>

                      <Field label="Сайты, которые нравятся" htmlFor="inspiration">
                        <textarea
                          id="inspiration"
                          placeholder="Например: нравится структура Apple, чистота Vercel, карточки как у Linear. Можно просто вставить ссылки."
                          rows={4}
                          value={values.inspiration}
                          onChange={(e) => setValues({ ...values, inspiration: e.target.value })}
                        />
                      </Field>

                      <ChoiceGroup label="Настроение сайта" columns="three">
                        {moods.map((mood) => (
                          <Choice key={mood} active={values.mood === mood} onClick={() => setValues({ ...values, mood })}>
                            {mood}
                          </Choice>
                        ))}
                      </ChoiceGroup>
                    </div>
                  )}

                  {step === 3 && (
                    <div className={styles.stepContent}>
                      <ChoiceGroup label="Тип сайта" columns="site">
                        {siteTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <Choice key={type.label} active={values.siteType === type.label} onClick={() => setValues({ ...values, siteType: type.label })}>
                              <Icon size={17} /> {type.label}
                            </Choice>
                          );
                        })}
                      </ChoiceGroup>

                      <div className={styles.fieldGroup}>
                        <span className={styles.groupTitle}>Формат разработки</span>
                        <div className={styles.packageList}>
                          {packages.map((pkg) => {
                            const Icon = pkg.icon;
                            return (
                              <button
                                key={pkg.key}
                                type="button"
                                className={`${styles.packageCard} ${values.packageKey === pkg.key ? styles.packageActive : ""}`}
                                onClick={() => setValues({ ...values, packageKey: pkg.key })}
                              >
                                <span className={styles.packageIcon}><Icon size={18} /></span>
                                <span className={styles.packageMain}>
                                  <strong>{pkg.name}</strong>
                                  <small>{pkg.note}</small>
                                </span>
                                <span className={styles.packageMeta}>
                                  {pkg.popular && <em>Популярный</em>}
                                  <b>{pkg.price}</b>
                                  <small><Clock3 size={13} /> {pkg.deadline}</small>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <ChoiceGroup label="Что нужно подключить?" columns="three">
                        {integrations.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Choice
                              key={item.label}
                              active={values.integrations.includes(item.label)}
                              onClick={() => handleToggleIntegration(item.label)}
                            >
                              <Icon size={16} /> {item.label}
                            </Choice>
                          );
                        })}
                      </ChoiceGroup>
                    </div>
                  )}

                  {step === 4 && (
                    <div className={styles.stepContent}>
                      <div className={styles.twoColumns}>
                        <Field label="Ваше имя" htmlFor="contactName">
                          <input
                            id="contactName"
                            type="text"
                            placeholder="Например: Анна"
                            value={values.contactName}
                            onChange={(e) => setValues({ ...values, contactName: e.target.value })}
                          />
                        </Field>
                        <Field label="Телефон или Telegram" htmlFor="contactContact">
                          <input
                            id="contactContact"
                            type="text"
                            placeholder="Например: @username или +375 29 000-00-00"
                            value={values.contactContact}
                            onChange={(e) => setValues({ ...values, contactContact: e.target.value })}
                          />
                        </Field>
                      </div>

                      <ChoiceGroup label="Желаемый срок" columns="deadline">
                        {deadlines.map((deadline) => (
                          <Choice key={deadline} active={values.deadline === deadline} onClick={() => setValues({ ...values, deadline })}>
                            {deadline}
                          </Choice>
                        ))}
                      </ChoiceGroup>

                      <Field label="Дополнительные пожелания" htmlFor="notes">
                        <textarea
                          id="notes"
                          placeholder="Например: нужен тёмный стиль, добавить блок с отзывами, форма должна отправляться в Telegram"
                          rows={4}
                          value={values.notes}
                          onChange={(e) => setValues({ ...values, notes: e.target.value })}
                        />
                      </Field>
                    </div>
                  )}
                </motion.div>
              )}

              {!isSent && (
                <div className={styles.actions}>
                  <button type="button" className={styles.secondaryBtn} onClick={handlePrevStep} disabled={step === 1}>
                    Назад
                  </button>
                  <button type="button" className={styles.primaryBtn} onClick={step === 4 ? handleSubmit : handleNextStep}>
                    {step === 4 ? "Отправить бриф" : "Далее"}
                  </button>
                </div>
              )}
            </form>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <label className={styles.field} htmlFor={htmlFor}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function ChoiceGroup({ label, columns, children }: { label: string; columns: string; children: ReactNode }) {
  return (
    <div className={styles.fieldGroup}>
      <span className={styles.groupTitle}>{label}</span>
      <div className={`${styles.choiceGrid} ${styles[`choiceGrid_${columns}`]}`}>{children}</div>
    </div>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`${styles.choice} ${active ? styles.choiceActive : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
