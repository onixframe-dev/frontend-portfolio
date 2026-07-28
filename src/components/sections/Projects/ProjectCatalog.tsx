"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { categories, projects } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { AnimatedTitle } from "../../ui/AnimatedTitle";
import { SectionSubtitle } from "../../ui/SectionSubtitle";
import { Button } from "../../ui/Button";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./ProjectCatalog.module.css";

type ActiveCategory = "All Projects" | ProjectCategory;

const PROJECTS_PER_PAGE = 6;

export function ProjectCatalog() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All Projects");
  const [page, setPage] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const pageCount = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const visibleProjects = filteredProjects.slice(page * PROJECTS_PER_PAGE, (page + 1) * PROJECTS_PER_PAGE);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCategory = (category: ActiveCategory) => {
    setActiveCategory(category);
    setPage(0);
    scrollToSection();
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
            Отфильтруйте проекты по типу и стеку.
            <br />
            Лендинги, React-приложения.
            <br />
            Next.js + TypeScript.
          </SectionSubtitle>
        </div>
        <div className={styles.filterBarWrapper}>
          <div className={styles.filterBar} role="tablist" aria-label="Project categories">
            {categories.map((category) => (
              <Button
                key={category}
                variant="filter"
                active={category === activeCategory}
                onClick={() => selectCategory(category)}
                type="button"
              >
                {category}
              </Button>
            ))}
          </div>
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
