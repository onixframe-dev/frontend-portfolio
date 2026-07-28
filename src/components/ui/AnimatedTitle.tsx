import type { ElementType, ReactNode } from "react";
import styles from "./AnimatedTitle.module.css";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function AnimatedTitle({ as: Tag = "h2", children, className = "" }: Props) {
  return <Tag className={`${styles.title} ${className}`.trim()}>{children}</Tag>;
}
