import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTypescript,
  SiGithub,
  SiVercel,
  SiFigma,
} from 'react-icons/si';
import { AnimatedTitle } from '../../ui/AnimatedTitle';
import { SectionSubtitle } from '../../ui/SectionSubtitle';
import sectionStyles from '../../ui/Section.module.css';
import styles from './TechStack.module.css';

type TechItem = {
  id: number;
  name: string;
  Icon: IconType;
  color: string;
  glowColor: string;
};

const techStack: TechItem[] = [
  {
    id: 1,
    name: 'React',
    Icon: SiReact,
    color: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.28)',
  },
  {
    id: 2,
    name: 'Next.js',
    Icon: SiNextdotjs,
    color: '#FFFFFF',
    glowColor: 'rgba(255, 255, 255, 0.22)',
  },
  {
    id: 3,
    name: 'JavaScript',
    Icon: SiJavascript,
    color: '#F7DF1E',
    glowColor: 'rgba(247, 223, 30, 0.25)',
  },
  {
    id: 4,
    name: 'HTML5',
    Icon: SiHtml5,
    color: '#E34F26',
    glowColor: 'rgba(227, 79, 38, 0.28)',
  },
  {
    id: 5,
    name: 'CSS3',
    Icon: SiCss,
    color: '#1572B6',
    glowColor: 'rgba(21, 114, 182, 0.25)',
  },
  {
    id: 6,
    name: 'GitHub',
    Icon: SiGithub,
    color: '#FFFFFF',
    glowColor: 'rgba(255, 255, 255, 0.22)',
  },
  {
    id: 7,
    name: 'Vercel',
    Icon: SiVercel,
    color: '#FFFFFF',
    glowColor: 'rgba(255, 255, 255, 0.2)',
  },
  {
    id: 8,
    name: 'TypeScript',
    Icon: SiTypescript,
    color: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.25)',
  },
  {
    id: 9,
    name: 'Figma',
    Icon: SiFigma,
    color: '#F24E1E',
    glowColor: 'rgba(242, 78, 30, 0.2)',
  },
];

export function TechStack() {
  return (
    <section className={styles.techStackSection}>
      <div className={sectionStyles.sectionGrid}>
        <div className={styles.techStackHeader}>
          <AnimatedTitle>Технологии, с которыми работаю</AnimatedTitle>
          <SectionSubtitle>Подбираю стек под задачи проекта, требования к интерфейсу, производительности и дальнейшему развитию.</SectionSubtitle>
        </div>

        <div className={styles.techStackGrid}>
          <div className={`${styles.techRow} ${styles.topRow}`}>
            {techStack.slice(0, 5).map((tech) => (
              <div
                key={tech.id}
                className={styles.techBadge}
                style={
                  {
                    '--tech-color': tech.color,
                    '--glow-color': tech.glowColor,
                  } as CSSProperties
                }
              >
                <div className={styles.techBadgeInner}>
                  <tech.Icon className={styles.techIcon} />
                  <span className={styles.techLabel}>{tech.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.techRow} ${styles.bottomRow}`}>
            {techStack.slice(5).map((tech) => (
              <div
                key={tech.id}
                className={styles.techBadge}
                style={
                  {
                    '--tech-color': tech.color,
                    '--glow-color': tech.glowColor,
                  } as CSSProperties
                }
              >
                <div className={styles.techBadgeInner}>
                  <tech.Icon className={styles.techIcon} />
                  <span className={styles.techLabel}>{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
