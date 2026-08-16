import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./AnimatedTitle.module.css";

type Props<T extends ElementType> = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function AnimatedTitle<T extends ElementType = "h2">({
  as,
  children,
  className = "",
  ...props
}: Props<T>) {
  const Tag = as || "h2";

  return (
    <Tag className={`${styles.title} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
