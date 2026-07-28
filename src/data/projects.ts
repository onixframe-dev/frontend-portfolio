export type ProjectCategory = "Landing Pages" | "React" | "Next.js / TS";

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  year: string;
  accent: string;
  demoUrl: string;
  image?: string;
  imageAlt?: string;
};

export const categories: Array<"All Projects" | ProjectCategory> = [
  "All Projects",
  "Landing Pages",
  "React",
  "Next.js / TS"
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Figma Helper",
    category: "Next.js / TS",
    description: "Инструмент для подготовки макетов, структуры секций и frontend-кода из Figma.",
    stack: ["Next.js", "TypeScript", "React", "UI"],
    year: "2026",
    accent: "#7C5CFF",
    demoUrl: "#"
  },
  {
    id: 2,
    title: "Landing Page",
    category: "React",
    description: "Лендинг артистов на HTML, CSS и JavaScript: фильтрация, карточки и подключение базы данных.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#5CE1E6",
    demoUrl: "https://artist-hub-pi.vercel.app/",
    image: "/Header.jpg",
    imageAlt: "Landing page website preview"
  },
  {
    id: 3,
    title: "Premium Landing Page",
    category: "Landing Pages",
    description: "Современный лендинг с чистой структурой, адаптивом, анимациями и сильным первым экраном.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#ff3df5",
    demoUrl: "#"
  },
  {
    id: 4,
    title: "SaaS Promo Page",
    category: "Landing Pages",
    description: "Промо-страница для цифрового продукта: оффер, преимущества, тарифы, FAQ и форма заявки.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#3db1ff",
    demoUrl: "#"
  },
  {
    id: 5,
    title: "Agency Website",
    category: "Landing Pages",
    description: "Сайт для студии или сервиса с портфолио, услугами, отзывами и контактным блоком.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#d83dff",
    demoUrl: "#"
  },
  {
    id: 6,
    title: "Product Showcase",
    category: "Landing Pages",
    description: "Лендинг продукта с крупными визуальными блоками, характеристиками и CTA-секциями.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#3dffe5",
    demoUrl: "#"
  },
  {
    id: 7,
    title: "React Product Page",
    category: "React",
    description: "Страница продукта на React с компонентами, состояниями, фильтрами и аккуратным интерфейсом.",
    stack: ["React", "CSS Modules", "Components"],
    year: "2026",
    accent: "#B8FF5C",
    demoUrl: "#"
  },
  {
    id: 8,
    title: "Motion UI Cards",
    category: "Next.js / TS",
    description: "Набор интерактивных карточек, hover-эффектов и микроанимаций для современных сайтов.",
    stack: ["React", "Framer Motion", "UI"],
    year: "2026",
    accent: "#FF5CB8",
    demoUrl: "#"
  },
  {
    id: 9,
    title: "Portfolio Hub",
    category: "Next.js / TS",
    description: "Личный сайт-каталог проектов: фильтры, карточки, прайсы и ссылки на демо.",
    stack: ["Next.js", "TypeScript", "Vercel"],
    year: "2026",
    accent: "#5CFFB1",
    demoUrl: "#"
  }
];
