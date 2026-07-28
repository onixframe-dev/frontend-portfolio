import Image from "next/image";
import { Github, Instagram, Mail, Phone, Send, Triangle } from "lucide-react";
import styles from "./Footer.module.css";

const footerNav = [
  { href: "/#catalog", label: "Каталог" },
  { href: "/#pricing", label: "Услуги" },
  { href: "/#about", label: "Подход" },
  { href: "/#contacts", label: "Контакты" },
  { href: "/brief", label: "Заявка" },
];

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

          <nav className={styles.footerNav} aria-label="Footer navigation">
            {footerNav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className={styles.footerLinks}>
            <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
            <a href="https://vercel.com" target="_blank" rel="noreferrer"><Triangle size={17} /> Vercel</a>
            <a href="https://www.instagram.com/igor_gordich/" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
            <a href="https://t.me" target="_blank" rel="noreferrer"><Send size={17} /> Telegram</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© {year} OnixFrame</span>
          <div className={styles.footerContacts}>
            <a href="mailto:onixframe.dev@gmail.com"><Mail size={15} /> onixframe.dev@gmail.com</a>
            <a href="tel:+375296702546"><Phone size={15} /> +375 29 670-25-46</a>
          </div>
        </div>

        <p className={styles.footerLegal}>{legalInfo}</p>
      </div>
    </footer>
  );
}
