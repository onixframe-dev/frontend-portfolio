import type { ElementType, ReactNode } from "react";
import styles from "./SectionSubtitle.module.css";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function SectionSubtitle({ as: Tag = "p", children, className = "" }: Props) {
  return <Tag className={`${styles.subtitle} ${className}`.trim()}>{children}</Tag>;
}
