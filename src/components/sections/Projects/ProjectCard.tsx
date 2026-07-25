import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article
      className={`${styles.projectCard} ${featured ? styles.featuredCard : ''}`}
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      <div className={styles.projectThumb}>
        <div className={styles.thumbGlow} />
        <div className={styles.thumbFrame}>
          <span>{project.category}</span>
          <strong>{project.title}</strong>
        </div>
      </div>
      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.stackList}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a className={styles.projectLink} href={project.demoUrl}>
          Подробнее <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}
