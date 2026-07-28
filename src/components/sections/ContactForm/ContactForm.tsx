"use client";

import { Instagram, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, normalizeTextValue, type ContactFormValues } from "@/lib/validation";
import sectionStyles from "../../ui/Section.module.css";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import { Button } from "../../ui/Button";
import { SuccessToast } from "../../ui/SuccessToast";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [sendError, setSendError] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      contact: "",
      message: "",
    },
  });

  const normalizeTextField = (field: "name" | "message") => {
    setValue(field, normalizeTextValue(getValues(field)), { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = async (values: ContactFormValues) => {
    setSendError("");

    const response = await fetch("/api/email/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setSendError(data?.error || "Не удалось отправить сообщение. Попробуйте написать на email или в Telegram.");
      return;
    }

    reset();
    setShowSuccessToast(true);
  };

  return (
    <section id="contacts" className={`${sectionStyles.sectionBlock} ${styles.contactSection}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.contactHeader}`}>
        <div>
          <AnimatedTitle>Обсудим проект без лишних слов</AnimatedTitle>
          <SectionSubtitle>
            Оставьте короткое сообщение или сразу заполните заявку.
            <br />
            Я отвечу, уточню детали и подскажу подходящий формат разработки.
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
            <a href="https://t.me" target="_blank" rel="noreferrer"><Send size={16} /> <span>Telegram</span></a>
            <a href="tel:+375296702546"><Phone size={16} /> <span>Телефон</span></a>
            <a href="https://www.instagram.com/igor_gordich/" target="_blank" rel="noreferrer"><Instagram size={16} /> <span>Instagram</span></a>
            <a href="mailto:onixframe.dev@gmail.com"><Mail size={16} /> <span>Email</span></a>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.row}>
            <label>
              <span>Ваше имя</span>
              <input
                type="text"
                placeholder="Например: Анна"
                aria-invalid={Boolean(errors.name)}
                {...register("name", { onBlur: () => normalizeTextField("name") })}
              />
                  <small className={styles.errorText}>{errors.name?.message || "\u00a0"}</small>
            </label>
            <label>
              <span>Телефон или Telegram</span>
              <input
                type="text"
                placeholder="@username или номер телефона"
                aria-invalid={Boolean(errors.contact)}
                {...register("contact")}
              />
                  <small className={styles.errorText}>{errors.contact?.message || "\u00a0"}</small>
            </label>
          </div>

          <label>
            <span>Что нужно сделать?</span>
            <textarea
              rows={5}
              placeholder="Например: нужен лендинг для услуги, есть тексты и референсы, макета пока нет."
              aria-invalid={Boolean(errors.message)}
              {...register("message", { onBlur: () => normalizeTextField("message") })}
            />
            <small className={styles.errorText}>{errors.message?.message || "\u00a0"}</small>
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
