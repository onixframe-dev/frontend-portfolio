import { About } from "@/components/sections/About/About";
import { ContactForm } from "@/components/sections/ContactForm/ContactForm";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { Hero } from "@/components/sections/Hero/Hero";
import { ProjectCatalog } from "@/components/sections/Projects/ProjectCatalog";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { Services } from "@/components/sections/Services/Services";
import { TechStack } from "@/components/sections/TechStack/TechStack";
import type { Metadata } from "next";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Разработка сайтов и frontend-интерфейсов для бизнеса",
  description:
    "Разработка сайтов, лендингов и frontend-интерфейсов для бизнеса: React, Next.js, адаптивная вёрстка, формы заявок и подготовка к запуску. Работаю с клиентами из Беларуси, СНГ и других стран.",
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <div className="starryRegion">
        <ProjectCatalog />
        <Services />
        <About />
        <Pricing />
        <TechStack />
        <ContactForm />
        <Footer />
      </div>
      <ScrollToTop />
    </main>
  );
}
