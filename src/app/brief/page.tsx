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
  Rocket,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Button } from "@/components/ui/Button";
import { SuccessToast } from "@/components/ui/SuccessToast";
import { briefSchema, briefStepFields, normalizeTextValue, type BriefFormValues } from "@/lib/validation";
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
    price: "от 600 Br",
    deadline: "3–5 рабочих дней",
    note: "Лендинг, сайт-визитка или промо-страница без сложной логики.",
    icon: FileText,
  },
  {
    key: "react",
    name: "React Landing / Website",
    shortName: "React Website",
    price: "от 1 100 Br",
    deadline: "7–14 рабочих дней",
    note: "Компоненты, карточки, фильтры, модальные окна и интерактивность.",
    icon: Layers3,
    popular: true,
  },
  {
    key: "next",
    name: "Next.js + TypeScript",
    shortName: "Next.js / TS",
    price: "от 1 700 Br",
    deadline: "14–30 рабочих дней",
    note: "SEO, страницы, архитектура проекта и база для дальнейшего роста.",
    icon: Code2,
  },
];

const integrations = [
  { label: "Форма заявки", icon: Mail },
  { label: "Telegram-уведомления", icon: Send },
  { label: "Email-уведомления", icon: Mail },
  { label: "Карта", icon: MapPinned },
  { label: "Аналитика", icon: BarChart3 },
  { label: "Ничего", icon: CheckCircle2 },
];

const deadlines = ["Как можно скорее", "3–5 дней", "1–2 недели", "2–4 недели", "Не срочно"];

const textAssistProps = {
  lang: "ru",
  spellCheck: true,
  autoCorrect: "on",
  autoCapitalize: "sentences",
} as const;

const contactInputProps = {
  spellCheck: false,
  autoCorrect: "off",
  autoCapitalize: "none",
} as const;

export default function BriefPage() {
  const [step, setStep] = useState(1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [sendError, setSendError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BriefFormValues>({
    resolver: zodResolver(briefSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
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
    },
  });

  const values = watch();

  useEffect(() => {
    const packageKey = new URLSearchParams(window.location.search).get("package");
    const selectedPackage = packages.find((pkg) => pkg.key === packageKey);

    if (!selectedPackage) {
      return;
    }

    setValue("packageKey", selectedPackage.key, { shouldDirty: true, shouldValidate: true });

    if (!getValues("notes")) {
      setValue("notes", `Интересует пакет: ${selectedPackage.name}.`, {
        shouldDirty: true,
        shouldValidate: false,
      });
    }
  }, [getValues, setValue]);

  const normalizeTextField = (
    field: "projectName" | "business" | "audience" | "advantage" | "inspiration" | "contactName" | "notes",
  ) => {
    setValue(field, normalizeTextValue(getValues(field) || ""), { shouldDirty: true, shouldValidate: true });
  };

  const handleToggleIntegration = (item: string) => {
    const current = getValues("integrations");

    if (item === "Ничего") {
      setValue("integrations", ["Ничего"], { shouldDirty: true, shouldValidate: true });
      return;
    }

    const clean = current.filter((value) => value !== "Ничего");
    const next = clean.includes(item) ? clean.filter((value) => value !== item) : [...clean, item];
    setValue("integrations", next.length ? next : ["Ничего"], { shouldDirty: true, shouldValidate: true });
  };

  const handleNextStep = async () => {
    const isStepValid = await trigger(briefStepFields[step], { shouldFocus: true });

    if (isStepValid) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const handlePrevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleStepClick = async (targetStep: number) => {
    if (targetStep <= step) {
      setStep(targetStep);
      return;
    }

    const isStepValid = await trigger(briefStepFields[step], { shouldFocus: true });

    if (isStepValid) {
      setStep(targetStep);
    }
  };

  const submitBrief = handleSubmit(async (values) => {
    setSendError("");

    const response = await fetch("/api/email/brief", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setSendError(data?.error || "Не удалось отправить заявку. Попробуйте написать на email или в Telegram.");
      return;
    }

    reset();
    setStep(1);
    setShowSuccessToast(true);
  });

  return (
    <>
      <Header />
      <main className={styles.briefPage}>
        <div className={styles.container}>
          <Button variant="ghost" href="/" className={styles.backButton}>
            <ArrowLeft size={17} /> Вернуться на главную
          </Button>

          <header className={styles.header}>
            <AnimatedTitle as="h1">Расскажите о проекте</AnimatedTitle>
            <p>
              Короткая анкета без лишней бюрократии.
              <br />
              По ответам я пойму формат сайта, сроки и объём работы.
            </p>
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
                    onClick={() => {
                      void handleStepClick(item.id);
                    }}
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
            <form className={styles.form} onSubmit={submitBrief} noValidate>
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
                          placeholder="Например: студия маникюра LUNA, бренд одежды Nubo, личное портфолио."
                          autoComplete="organization"
                          aria-invalid={Boolean(errors.projectName)}
                          {...textAssistProps}
                          {...register("projectName", { onBlur: () => normalizeTextField("projectName") })}
                        />
                        {errors.projectName ? <small className={styles.errorText}>{errors.projectName.message}</small> : null}
                      </Field>

                      <Field label="Чем занимаетесь?" htmlFor="business">
                        <textarea
                          id="business"
                          placeholder="Например: продаём женскую одежду онлайн, делаем ремонт квартир, запускаем курс по дизайну."
                          rows={3}
                          aria-invalid={Boolean(errors.business)}
                          {...textAssistProps}
                          {...register("business", { onBlur: () => normalizeTextField("business") })}
                        />
                        {errors.business ? <small className={styles.errorText}>{errors.business.message}</small> : null}
                      </Field>

                      <Field label="Целевая аудитория" htmlFor="audience">
                        <input
                          id="audience"
                          type="text"
                          placeholder="Например: девушки 20–35 лет, малый бизнес, владельцы квартир после покупки."
                          autoComplete="off"
                          aria-invalid={Boolean(errors.audience)}
                          {...textAssistProps}
                          {...register("audience", { onBlur: () => normalizeTextField("audience") })}
                        />
                        {errors.audience ? <small className={styles.errorText}>{errors.audience.message}</small> : null}
                      </Field>

                      <Field label="Главное преимущество" htmlFor="advantage">
                        <input
                          id="advantage"
                          type="text"
                          placeholder="Например: быстро отвечаем, работаем под ключ, сильный визуал, честные сроки."
                          autoComplete="off"
                          aria-invalid={Boolean(errors.advantage)}
                          {...textAssistProps}
                          {...register("advantage", { onBlur: () => normalizeTextField("advantage") })}
                        />
                        {errors.advantage ? <small className={styles.errorText}>{errors.advantage.message}</small> : null}
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
                            onClick={() => setValue("brandStyle", item, { shouldDirty: true, shouldValidate: true })}
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
                          aria-invalid={Boolean(errors.inspiration)}
                          {...textAssistProps}
                          {...register("inspiration", { onBlur: () => normalizeTextField("inspiration") })}
                        />
                        {errors.inspiration ? <small className={styles.errorText}>{errors.inspiration.message}</small> : null}
                      </Field>

                      <ChoiceGroup label="Настроение сайта" columns="three">
                        {moods.map((mood) => (
                          <Choice key={mood} active={values.mood === mood} onClick={() => setValue("mood", mood, { shouldDirty: true, shouldValidate: true })}>
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
                            <Choice key={type.label} active={values.siteType === type.label} onClick={() => setValue("siteType", type.label, { shouldDirty: true, shouldValidate: true })}>
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
                                onClick={() => setValue("packageKey", pkg.key, { shouldDirty: true, shouldValidate: true })}
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
                            autoComplete="name"
                            aria-invalid={Boolean(errors.contactName)}
                            {...textAssistProps}
                            {...register("contactName", { onBlur: () => normalizeTextField("contactName") })}
                          />
                          {errors.contactName ? <small className={styles.errorText}>{errors.contactName.message}</small> : null}
                        </Field>
                        <Field label="Контакты для связи" htmlFor="contactContact">
                          <input
                            id="contactContact"
                            type="text"
                            placeholder="Например: @telegram, Instagram, email или +375 29 670-25-46"
                            autoComplete="off"
                            inputMode="text"
                            aria-invalid={Boolean(errors.contactContact)}
                            {...contactInputProps}
                            {...register("contactContact")}
                          />
                          {errors.contactContact ? <small className={styles.errorText}>{errors.contactContact.message}</small> : null}
                        </Field>
                      </div>

                      <ChoiceGroup label="Желаемый срок" columns="deadline">
                        {deadlines.map((deadline) => (
                          <Choice key={deadline} active={values.deadline === deadline} onClick={() => setValue("deadline", deadline, { shouldDirty: true, shouldValidate: true })}>
                            {deadline}
                          </Choice>
                        ))}
                      </ChoiceGroup>

                      <Field label="Дополнительные пожелания" htmlFor="notes">
                        <textarea
                          id="notes"
                          placeholder="Например: нужен тёмный стиль, нужно добавить блок с отзывами, форма должна отправляться в Telegram."
                          rows={4}
                          aria-invalid={Boolean(errors.notes)}
                          {...textAssistProps}
                          {...register("notes", { onBlur: () => normalizeTextField("notes") })}
                        />
                        {errors.notes ? <small className={styles.errorText}>{errors.notes.message}</small> : null}
                      </Field>
                    </div>
                  )}
              </motion.div>

              <div className={styles.actions}>
                <button type="button" className={styles.secondaryBtn} onClick={handlePrevStep} disabled={step === 1}>
                  Назад
                </button>
                <button
                  type={step === 4 ? "submit" : "button"}
                  className={styles.primaryBtn}
                  disabled={isSubmitting}
                  onClick={step === 4 ? undefined : () => {
                    void handleNextStep();
                  }}
                >
                  {step === 4 ? (isSubmitting ? "Отправляю..." : "Отправить заявку") : "Далее"}
                </button>
                {sendError ? <small className={styles.errorText}>{sendError}</small> : null}
              </div>
            </form>

          </div>
        </div>
      </main>
      <SuccessToast
        open={showSuccessToast}
        title="Заявка отправлена"
        description="Спасибо. Я получил заявку и отвечу по указанному контакту."
        onClose={() => setShowSuccessToast(false)}
      />
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
