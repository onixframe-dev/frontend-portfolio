"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import sectionStyles from "../../ui/Section.module.css";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import { Button } from "../../ui/Button";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      contact: "",
      message: "",
    },
  });

  const onSubmit = () => {
    setSent(true);
  };

  return (
    <section id="contacts" className={`${sectionStyles.sectionBlock} ${styles.contactSection}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.contactHeader}`}>
        <div>
          <AnimatedTitle>Обсудим проект без лишних кругов</AnimatedTitle>
          <SectionSubtitle>
            Оставьте короткое сообщение или сразу заполните заявку. Я отвечу и подскажу, какой формат разработки подойдёт лучше.
          </SectionSubtitle>
        </div>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}><MessageCircle size={22} /></div>
          <h3>Можно начать с пары строк</h3>
          <p>
            Напишите, какой сайт нужен, есть ли макет и примерный срок. Если задача объёмная, удобнее заполнить заявку.
          </p>
          <div className={styles.quickLinks}>
            <a href="https://t.me" target="_blank" rel="noreferrer"><Send size={16} /> Telegram</a>
            <a href="mailto:hello@example.com"><Mail size={16} /> Email</a>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {sent ? (
            <div className={styles.successBox}>
              <h3>Сообщение подготовлено</h3>
              <p>Форма сейчас frontend-ready. Следующий шаг: подключить отправку в Telegram, email или вашу CRM.</p>
              <Button variant="ghost" href="/brief">Заполнить заявку</Button>
            </div>
          ) : (
            <>
              <div className={styles.row}>
                <label>
                  <span>Ваше имя</span>
                  <input
                    type="text"
                    placeholder="Например: Анна"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  {errors.name ? <small className={styles.errorText}>{errors.name.message}</small> : null}
                </label>
                <label>
                  <span>Телефон или Telegram</span>
                  <input
                    type="text"
                    placeholder="@username или номер"
                    aria-invalid={Boolean(errors.contact)}
                    {...register("contact")}
                  />
                  {errors.contact ? <small className={styles.errorText}>{errors.contact.message}</small> : null}
                </label>
              </div>

              <label>
                <span>Что нужно сделать?</span>
                <textarea
                  rows={5}
                  placeholder="Например: нужен лендинг для услуги, есть тексты и референсы, макета пока нет"
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                {errors.message ? <small className={styles.errorText}>{errors.message.message}</small> : null}
              </label>

              <div className={styles.actions}>
                <Button variant="priceFeatured" type="submit" className={styles.submitButton}>Отправить сообщение</Button>
                <Button variant="price" href="/brief" className={styles.briefButton}>Заполнить заявку</Button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
