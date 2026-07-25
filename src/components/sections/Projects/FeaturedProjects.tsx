import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./FeaturedProjects.module.css";

export function FeaturedProjects() {
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className={sectionStyles.sectionBlock}>
      <div className={sectionStyles.sectionHeader}>
        <h2>Выбранные проекты</h2>
        <p>Лучшие работы: премиальные сайты, коммерческие проекты и интерактивные интерфейсы.</p>
      </div>
      <div className={styles.featuredGrid}>
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}
