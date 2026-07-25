"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import sectionStyles from "../../ui/Section.module.css";
import { Button } from "../../ui/Button";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className={`${sectionStyles.sectionBlock} ${styles.contactSection}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.contactHeader}`}>
        <div>
          <span className={styles.kicker}>Связаться</span>
          <h2>Обсудим проект без лишних кругов</h2>
          <p>
            Оставьте короткое сообщение или сразу заполните бриф. Я отвечу и подскажу, какой формат разработки подойдёт лучше.
          </p>
        </div>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}><MessageCircle size={22} /></div>
          <h3>Можно начать с пары строк</h3>
          <p>
            Напишите, какой сайт нужен, есть ли макет и примерный срок. Если задача объёмная, удобнее пройти бриф.
          </p>
          <div className={styles.quickLinks}>
            <a href="https://t.me" target="_blank" rel="noreferrer"><Send size={16} /> Telegram</a>
            <a href="mailto:hello@example.com"><Mail size={16} /> Email</a>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className={styles.successBox}>
              <h3>Сообщение подготовлено</h3>
              <p>Форма сейчас frontend-ready. Следующий шаг: подключить отправку в Telegram, email или вашу CRM.</p>
              <Button variant="ghost" href="/brief">Заполнить подробный бриф</Button>
            </div>
          ) : (
            <>
              <div className={styles.row}>
                <label>
                  <span>Ваше имя</span>
                  <input type="text" placeholder="Например: Анна" />
                </label>
                <label>
                  <span>Телефон или Telegram</span>
                  <input type="text" placeholder="@username или номер" />
                </label>
              </div>

              <label>
                <span>Что нужно сделать?</span>
                <textarea rows={5} placeholder="Например: нужен лендинг для услуги, есть тексты и референсы, макета пока нет" />
              </label>

              <div className={styles.actions}>
                <Button variant="primary" type="submit">Отправить сообщение</Button>
                <Button variant="ghost" href="/brief">Заполнить бриф</Button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
