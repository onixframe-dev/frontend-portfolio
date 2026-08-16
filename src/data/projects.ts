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
    title: "Expense Tracker",
    category: "Next.js / TS",
    description: "Приложение для учёта финансов с авторизацией, транзакциями, категориями и аналитикой расходов.",
    stack: ["React", "Next.js", "TypeScript", "JavaScript"],
    year: "2026",
    accent: "#18f08b",
    demoUrl: "https://expence-tracker-team.vercel.app/",
    image: "/expence-tracker.png",
    imageAlt: "Expense Tracker app preview"
  },
  {
    id: 2,
    title: "Image Search App",
    category: "Landing Pages",
    description: "Приложение для поиска изображений через Pixabay API с галереей, лайтбоксом и подгрузкой результатов.",
    stack: ["Vite", "JavaScript", "Axios", "SimpleLightbox"],
    year: "2026",
    accent: "#4f73ff",
    demoUrl: "https://search-images-bay.vercel.app/",
    image: "/search-images.png",
    imageAlt: "Image Search App preview"
  },
  {
    id: 3,
    title: "Landing Page",
    category: "React",
    description: "Лендинг артистов на HTML, CSS и JavaScript: фильтрация, карточки и подключение базы данных.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#5CE1E6",
    demoUrl: "https://artist-hub-pi.vercel.app/",
    image: "/artist.jpg",
    imageAlt: "Landing page website preview"
  },
  {
    id: 4,
    title: "NoteHub Auth",
    category: "Next.js / TS",
    description: "Приложение заметок с авторизацией, поиском, пагинацией, профилем пользователя и управлением записями.",
    stack: ["React", "Next.js", "TypeScript", "JavaScript"],
    year: "2026",
    accent: "#2f80ff",
    demoUrl: "https://notehub-auth.vercel.app/",
    image: "/notehub.png",
    imageAlt: "NoteHub Auth app preview"
  },
  {
    id: 5,
    title: "Handmade Jewelry",
    category: "Landing Pages",
    description: "Лендинг для украшений ручной работы с первым экраном, преимуществами, галереей, отзывами и контактами.",
    stack: ["Vite", "HTML", "CSS", "JavaScript"],
    year: "2026",
    accent: "#d5c66f",
    demoUrl: "https://onixframe-dev.github.io/Handmade-Jewely/",
    image: "/handmade-Jewely.png",
    imageAlt: "Handmade Jewelry landing page preview"
  },
  {
    id: 6,
    title: "WebStudio",
    category: "Landing Pages",
    description: "Адаптивный лендинг веб-студии с навигацией, портфолио, мобильным меню и модальной формой заявки.",
    stack: ["HTML5", "CSS3", "Flexbox"],
    year: "2026",
    accent: "#4d5bff",
    demoUrl: "https://webstudio-lemon.vercel.app/",
    image: "/webstudio.png",
    imageAlt: "WebStudio landing page preview"
  },
  {
    id: 7,
    title: "TravelTrucks",
    category: "Next.js / TS",
    description: "Каталог аренды кемперов с фильтрами, страницами деталей, галереей, отзывами и формой бронирования.",
    stack: ["Next.js", "TypeScript", "React", "TanStack Query"],
    year: "2026",
    accent: "#8fa99d",
    demoUrl: "https://travel-trucks-alpha-nine.vercel.app/",
    image: "/travel-trucks-.png",
    imageAlt: "TravelTrucks camper catalog preview"
  }
];

// Template for the next project card:
// {
//   id: 8,
//   title: "Project Name",
//   category: "Next.js / TS",
//   description: "Короткое описание проекта и ключевой функциональности.",
//   stack: ["React", "Next.js", "TypeScript", "JavaScript"],
//   year: "2026",
//   accent: "#5CE1E6",
//   demoUrl: "https://project-demo.example.com/",
//   image: "/project-image.png",
//   imageAlt: "Project preview"
// }
