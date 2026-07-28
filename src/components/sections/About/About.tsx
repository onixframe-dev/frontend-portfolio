import { Code2, Layers3, Rocket } from "lucide-react";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./About.module.css";

const items = [
  { icon: Code2, title: "Frontend", text: "Адаптивные страницы, аккуратная структура, чистая верстка и понятные компоненты." },
  { icon: Layers3, title: "UI logic", text: "Карточки, фильтры, состояния, модальные окна, hover-эффекты и плавные анимации." },
  { icon: Rocket, title: "Launch", text: "Подготовка проекта к публикации: GitHub, Vercel, оптимизация и проверка деталей." }
];

export function About() {
  return (
    <section id="about" className={`${sectionStyles.sectionBlock} ${styles.aboutBlock}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.aboutHeader}`}>
        <div>
          <AnimatedTitle>Подход: визуал, архитектура, результат</AnimatedTitle>
          <SectionSubtitle>
            Делаю современные лендинги и интерфейсы, где важны не только блоки на странице,
            но и ощущение продукта: от первого экрана до адаптива.
          </SectionSubtitle>
        </div>
      </div>
      <div className={styles.aboutGrid}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className={styles.aboutCard} key={item.title}>
              <Icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
