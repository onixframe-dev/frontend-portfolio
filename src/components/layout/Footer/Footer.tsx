import Image from "next/image";
import { Github, Instagram, Mail, Phone, Send, Triangle } from "lucide-react";
import styles from "./Footer.module.css";

const legalInfo = "Самозанятый: Фамилия И. О. · УНП: XXXXXXXXX";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerAbout}>
            <a href="#top" className={styles.footerBrand}>
              <Image src="/8.png" alt="NEXFRAME logo" className={styles.footerLogo} width={48} height={48} />
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
              <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
              <a href="https://vercel.com" target="_blank" rel="noreferrer"><Triangle size={17} /> Vercel</a>
              <a href="https://www.instagram.com/igor_gordich/" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
              <a href="https://t.me" target="_blank" rel="noreferrer"><Send size={17} /> Telegram</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerMeta}>
            <span>© {year} OnixFrame</span>
            <p className={styles.footerLegal}>{legalInfo}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
