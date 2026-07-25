"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { Github, Instagram, Send, Triangle } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a href="#" className={styles.footerBrand} onClick={scrollToTop}>
          <Image src="/8.png" alt="NEXFRAME logo" className={styles.footerLogo} width={48} height={48} />
          <span className={styles.footerBrandText}>OnixFrame</span>
        </a>

        <div className={styles.footerLinks}>
          <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
          <a href="https://vercel.com" target="_blank" rel="noreferrer"><Triangle size={17} /> Vercel</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
          <a href="https://t.me" target="_blank" rel="noreferrer"><Send size={17} /> Telegram</a>
        </div>
      </div>
    </footer>
  );
}
