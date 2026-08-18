import { ArrowUpRight, Code2, LayoutPanelTop, PanelsTopLeft } from "lucide-react";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./Services.module.css";

const services = [
  {
    href: "/sait-vizitka-dlya-biznesa",
    title: "Лендинг и сайт-визитка",
    description: "Страница для презентации услуги, компании, контактов и получения заявок.",
    price: "от 600 BYN",
    duration: "от 3–5 дней",
    icon: LayoutPanelTop,
  },
  {
    href: "/react-frontend-razrabotka",
    title: "React frontend-разработка",
    description: "Интерфейсы с компонентами, карточками, фильтрами и интерактивной логикой.",
    price: "от 1100 BYN",
    duration: "от 7–14 дней",
    icon: Code2,
  },
  {
    href: "/nextjs-sait-pod-kluch",
    title: "Next.js сайт под ключ",
    description: "SEO-структура, страницы, TypeScript, Vercel и база для развития проекта.",
    price: "от 1700 BYN",
    duration: "от 14–30 дней",
    icon: PanelsTopLeft,
  },
];

export function Services() {
  return (
    <section id="services" className={`${sectionStyles.sectionBlock} ${styles.servicesSection}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.servicesHeader}`}>
        <div>
          <AnimatedTitle>Что могу сделать для бизнеса</AnimatedTitle>
          <SectionSubtitle>
            Основные направления, которые чаще всего нужны для запуска сайта,
            <br />
            презентации услуги и получения заявок.
          </SectionSubtitle>
        </div>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <a className={styles.serviceCard} href={service.href} key={service.href}>
              <div className={styles.serviceTop}>
                <span className={styles.serviceIcon}>
                  <Icon size={22} />
                </span>
                <span className={styles.serviceMeta}>{service.duration}</span>
              </div>
              <div className={styles.serviceBody}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className={styles.serviceBottom}>
                <strong>{service.price}</strong>
                <span>
                  Подробнее <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
