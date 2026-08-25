import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const isExternalDemo = /^https?:\/\//.test(project.demoUrl);

  return (
    <article
      className={`${styles.projectCard} ${featured ? styles.featuredCard : ""}`}
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      <div className={styles.projectThumb}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes="(max-width: 380px) calc(100vw - 16px), (max-width: 760px) calc(100vw - 18px), (max-width: 920px) calc((100vw - 72px) / 2), (max-width: 1228px) calc((100vw - 96px) / 3), 378px"
            className={styles.projectImage}
          />
        ) : (
          <>
            <div className={styles.thumbGlow} />
            <div className={styles.thumbFrame}>
              <span>{project.category}</span>
              <strong>{project.title}</strong>
            </div>
          </>
        )}
      </div>
      <div className={styles.projectContent}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.stackList}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a
          className={styles.projectLink}
          href={project.demoUrl}
          target={isExternalDemo ? "_blank" : undefined}
          rel={isExternalDemo ? "noreferrer" : undefined}
        >
          Подробнее <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}
