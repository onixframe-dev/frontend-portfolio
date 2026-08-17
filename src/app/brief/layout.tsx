import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бриф на разработку сайта",
  description:
    "Короткая анкета OnixFrame для оценки сайта, лендинга или frontend-проекта: формат, сроки, интеграции, референсы и контакты.",
  alternates: {
    canonical: "/brief",
  },
  openGraph: {
    title: "Бриф на разработку сайта | OnixFrame",
    description:
      "Заполните короткий бриф, чтобы оценить формат сайта, сроки, объём работ и нужные интеграции.",
    url: "/brief",
  },
  twitter: {
    title: "Бриф на разработку сайта | OnixFrame",
    description:
      "Короткая анкета для оценки сайта, лендинга или frontend-проекта.",
  },
};

export default function BriefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
