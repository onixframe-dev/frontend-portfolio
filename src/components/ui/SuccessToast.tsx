"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import styles from "./SuccessToast.module.css";

type SuccessToastProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

export function SuccessToast({ open, title, description, onClose }: SuccessToastProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(onClose, 5200);
    return () => window.clearTimeout(timer);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <button type="button" className={styles.close} aria-label="Закрыть уведомление" onClick={onClose}>
        <X size={18} />
      </button>
      <span className={styles.icon} aria-hidden="true">
        <CheckCircle2 size={26} />
      </span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
