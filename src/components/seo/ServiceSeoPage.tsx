import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { Button } from "@/components/ui/Button";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";
import styles from "./ServiceSeoPage.module.css";

type ServiceSeoPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  price: string;
  duration: string;
  format: string;
  included: string[];
  audienceTitle: string;
  audienceText: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  structuredData: Record<string, unknown>;
};

export function ServiceSeoPage({
  eyebrow,
  title,
  lead,
  price,
  duration,
  format,
  included,
  audienceTitle,
  audienceText,
  faq,
  structuredData,
}: ServiceSeoPageProps) {
  return (
    <main>
      <Header />
      <div className="starryRegion">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <a className={styles.backLink} href="/razrabotka-lendinga-belarus">
                <ArrowLeft size={16} />
                К разделу о нас
              </a>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h1>{title}</h1>
              <p className={styles.lead}>{lead}</p>
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
                <strong>{price}</strong>
              </div>
              <div>
                <span>Срок</span>
                <strong>{duration}</strong>
              </div>
              <div>
                <span>Формат</span>
                <strong>{format}</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Что входит</p>
            <h2>Собираю страницу или интерфейс так, чтобы клиенту было понятно, что делать дальше</h2>
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
              <h2>{audienceTitle}</h2>
            </div>
            <div className={styles.textBlock}>
              {audienceText.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2>Частые вопросы</h2>
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
