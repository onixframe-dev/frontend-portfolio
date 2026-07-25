import { ArrowUpRight } from "lucide-react";
import { Button } from "../../ui/Button";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={`${styles.hero} ${sectionStyles.sectionGrid}`}>
      <div className={styles.heroCopy}>
        <h1>
          <span>Чистый <span className={styles.heroAccent}>frontend</span></span>
          <span>для <span className={styles.heroAccent}>премиальных</span> проектов</span>
        </h1>
        <p className={styles.heroText}>
          Современные сайты, лендинги и интерфейсы на React, Next.js и TypeScript.
          Адаптивная вёрстка, продуманная архитектура и готовое решение для запуска на Vercel.
        </p>
        <div className={styles.heroButtons}>
          <Button variant="primary" href="#pricing">
            Прайс-лист <ArrowUpRight size={18} />
          </Button>
          <Button variant="ghost" href="#catalog">Портфолио</Button>
        </div>
      </div>

      <div className={styles.heroVisual} aria-label="Portfolio preview">
        <div className={`${styles.orb} ${styles.orbOne}`} />
        <div className={`${styles.orb} ${styles.orbTwo}`} />
        <div className={`${styles.mockupCard} ${styles.mainMockup}`}>
          <div className={styles.mockupHeader}>
            <strong>Dashboard</strong>
            <span>Next.js / TypeScript</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.mockupBlock}>
              <div className={styles.mockupBlockHeader}></div>
              <div className={styles.mockupBlockLines}></div>
            </div>
            <div className={styles.mockupBlock}>
              <div className={styles.mockupBlockHeader}></div>
              <div className={styles.mockupBlockLines}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
