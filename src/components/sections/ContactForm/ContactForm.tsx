"use client";

import { Instagram, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { type FocusEvent, type FormEvent, useRef, useState } from "react";
import type { ContactFormValues } from "@/lib/validation";
import sectionStyles from "../../ui/Section.module.css";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import { Button } from "../../ui/Button";
import { SuccessToast } from "../../ui/SuccessToast";
import styles from "./ContactForm.module.css";

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

export function ContactForm() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [sendError, setSendError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Promise<typeof import("@/lib/validation")> | null>(null);
  const validationRunRef = useRef(0);

  const loadValidator = () => {
    validatorRef.current ??= import("@/lib/validation");
    return validatorRef.current;
  };

  const getValues = (form: HTMLFormElement): ContactFormValues => {
    const formData = new FormData(form);
    return {
      name: String(formData.get("name") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
  };

  const getErrors = (issues: Array<{ path: PropertyKey[]; message: string }>) => {
    const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    issues.forEach((issue) => {
      const field = issue.path[0];
      if ((field === "name" || field === "contact" || field === "message") && !nextErrors[field]) {
        nextErrors[field] = issue.message;
      }
    });
    return nextErrors;
  };

  const validateCurrentValues = () => {
    const form = formRef.current;
    if (!form) return;
    const validationRun = ++validationRunRef.current;

    void loadValidator().then(({ contactFormSchema }) => {
      const result = contactFormSchema.safeParse(getValues(form));
      if (validationRun === validationRunRef.current) {
        setErrors(result.success ? {} : getErrors(result.error.issues));
      }
    });
  };

  const normalizeTextField = async (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { normalizeTextValue } = await loadValidator();
    event.currentTarget.value = normalizeTextValue(event.currentTarget.value);
    validateCurrentValues();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { contactFormSchema } = await loadValidator();
    const result = contactFormSchema.safeParse(getValues(event.currentTarget));
    if (!result.success) {
      setErrors(getErrors(result.error.issues));
      return;
    }

    setErrors({});
    setSendError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setSendError(data?.error || "Не удалось отправить сообщение. Попробуйте написать на email или в Telegram.");
      return;
    }

    event.currentTarget.reset();
    setShowSuccessToast(true);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className={`${sectionStyles.sectionBlock} ${styles.contactSection}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.contactHeader}`}>
        <div>
          <AnimatedTitle>Обсудим проект без лишних слов</AnimatedTitle>
          <SectionSubtitle>
            Расскажите, какой сайт или интерфейс вам нужен. Я изучу задачу, уточню детали и предложу подходящий формат разработки.
          </SectionSubtitle>
        </div>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}><MessageCircle size={22} /></div>
          <h3>Можно начать с пары строк</h3>
          <p>
            Напишите, какой сайт нужен, есть ли макет и какие сроки важны.
            Если задача объёмная, удобнее заполнить заявку.
          </p>
          <div className={styles.quickLinks}>
            <a href="https://t.me/OnixFrame" target="_blank" rel="noreferrer"><Send size={16} /> <span>Telegram</span></a>
            <a href="tel:+375296702546"><Phone size={16} /> <span>Телефон</span></a>
            <a href="https://www.instagram.com/igor_gordich/" target="_blank" rel="noreferrer"><Instagram size={16} /> <span>Instagram</span></a>
            <a href="mailto:onixframe.dev@gmail.com"><Mail size={16} /> <span>Email</span></a>
          </div>
        </div>

        <form
          className={styles.form}
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
        >
          <div className={styles.row}>
            <label>
              <span>Ваше имя</span>
              <input
                type="text"
                placeholder="Например: Анна"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...textAssistProps}
                name="name"
                onFocus={() => void loadValidator()}
                onChange={validateCurrentValues}
                onBlur={normalizeTextField}
              />
                  <small className={styles.errorText}>{errors.name || "\u00a0"}</small>
            </label>
            <label>
              <span>Контакты для связи</span>
              <input
                type="text"
                placeholder="@telegram, Instagram, email или телефон"
                autoComplete="off"
                inputMode="text"
                aria-invalid={Boolean(errors.contact)}
                {...contactInputProps}
                name="contact"
                onFocus={() => void loadValidator()}
                onChange={validateCurrentValues}
              />
                  <small className={styles.errorText}>{errors.contact || "\u00a0"}</small>
            </label>
          </div>

          <label>
            <span>Что нужно сделать?</span>
            <textarea
              rows={5}
              placeholder="Например: нужен лендинг для услуги, есть тексты и референсы, макета пока нет."
              aria-invalid={Boolean(errors.message)}
              {...textAssistProps}
              name="message"
              onFocus={() => void loadValidator()}
              onChange={validateCurrentValues}
              onBlur={normalizeTextField}
            />
            <small className={styles.errorText}>{errors.message || "\u00a0"}</small>
          </label>

          <div className={styles.actions}>
            <Button variant="priceFeatured" type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Отправляю..." : "Отправить сообщение"}
            </Button>
            <Button variant="price" href="/brief" className={styles.briefButton}>Заполнить заявку</Button>
          </div>
          {sendError ? <small className={styles.errorText}>{sendError}</small> : null}
        </form>
      </div>
      <SuccessToast
        open={showSuccessToast}
        title="Сообщение отправлено"
        description="Спасибо. Я получил сообщение и отвечу по указанному контакту."
        onClose={() => setShowSuccessToast(false)}
      />
    </section>
  );
}
