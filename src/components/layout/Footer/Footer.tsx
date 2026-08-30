import Image from "next/image";
import { Github, Instagram, Mail, Phone, Send } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerAbout}>
            <a href="/" className={styles.footerBrand}>
              <Image src="/logo.png" alt="OnixFrame logo" className={styles.footerLogo} width={48} height={48} />
              <span className={styles.footerBrandText}>OnixFrame</span>
            </a>
            <p>Чистый frontend для сайтов, каталогов и интерфейсов с аккуратной архитектурой.</p>
          </div>

          <div className={styles.footerAside}>
            <div className={styles.footerContacts}>
              <a href="mailto:onixframe.dev@gmail.com"><Mail size={15} /> onixframe.dev@gmail.com</a>
              <a href="tel:+375296702546"><Phone size={15} /> +375 29 670-25-46</a>
            </div>

            <div className={styles.footerLinks}>
              <a href="/razrabotka-lendinga-belarus">О нас</a>
              <a href="https://github.com/onixframe-dev" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
              <a href="https://www.instagram.com/igor_gordich/" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
              <a href="https://t.me/OnixFrame" target="_blank" rel="noreferrer"><Send size={17} /> Telegram</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerMeta}>
            <span>© {year} OnixFrame</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
