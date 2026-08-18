import { About } from "@/components/sections/About/About";
import { ContactForm } from "@/components/sections/ContactForm/ContactForm";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { Hero } from "@/components/sections/Hero/Hero";
import { ProjectCatalog } from "@/components/sections/Projects/ProjectCatalog";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { Services } from "@/components/sections/Services/Services";
import { TechStack } from "@/components/sections/TechStack/TechStack";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <div className="starryRegion">
        <Services />
        <TechStack />
        <Pricing />
        <ProjectCatalog />
        <About />
        <ContactForm />
        <Footer />
      </div>
      <ScrollToTop />
    </main>
  );
}
