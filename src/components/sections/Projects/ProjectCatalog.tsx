"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./ProjectCatalog.module.css";

const PROJECTS_PER_PAGE = 6;
const COMPACT_PROJECTS_PER_PAGE = 4;

export function ProjectCatalog() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [page, setPage] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(PROJECTS_PER_PAGE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 920px)");
    const syncProjectsPerPage = () => {
      setProjectsPerPage(mediaQuery.matches ? COMPACT_PROJECTS_PER_PAGE : PROJECTS_PER_PAGE);
    };

    syncProjectsPerPage();
    mediaQuery.addEventListener("change", syncProjectsPerPage);

    return () => {
      mediaQuery.removeEventListener("change", syncProjectsPerPage);
    };
  }, []);

  const pageCount = Math.ceil(projects.length / projectsPerPage);
  const visibleProjects = projects.slice(page * projectsPerPage, (page + 1) * projectsPerPage);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, Math.max(pageCount - 1, 0)));
  }, [pageCount]);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 0), pageCount - 1));
    scrollToSection();
  };

  return (
    <section ref={sectionRef} id="catalog" className={`${sectionStyles.sectionBlock} ${styles.catalogSection}`}>
      <div className={`${sectionStyles.sectionHeader} ${styles.catalogHeader}`}>
        <div className={styles.catalogTitle}>
          <AnimatedTitle>Полный каталог проектов</AnimatedTitle>
          <SectionSubtitle>
            Подборка работ и шаблонов, которые показывают структуру, адаптив и визуальный подход.
          </SectionSubtitle>
        </div>
      </div>

      <div className={styles.catalogSection}>
        <div className={styles.catalogGrid}>
          {visibleProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${project.title}-${index}`} project={project} />
          ))}
        </div>
      </div>

      {pageCount > 1 ? (
        <nav className={styles.pagination} aria-label="Project pagination">
          <button
            type="button"
            className={`${styles.pageItem} ${styles.pageLink} ${page === 0 ? styles.paginationDisabled : ""}`}
            onClick={() => selectPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.pageItem} ${styles.pageLink} ${page === index ? styles.paginationActive : ""}`}
              onClick={() => selectPage(index)}
              aria-current={page === index ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            className={`${styles.pageItem} ${styles.pageLink} ${page === pageCount - 1 ? styles.paginationDisabled : ""}`}
            onClick={() => selectPage(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      ) : null}
    </section>
  );
}
