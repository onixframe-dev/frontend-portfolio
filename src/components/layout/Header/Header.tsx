"use client";

import Image from "next/image";
import { Github, Instagram, Mail, Menu, Send, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/Button";
import styles from "./Header.module.css";

const navItems = [
  { href: "/#catalog", label: "Каталог" },
  { href: "/#pricing", label: "Услуги" },
  { href: "/#about", label: "Подход" },
  { href: "/#contacts", label: "Контакты" },
  { href: "/brief", label: "Заявка" },
];

type MobileMenuItemProps = {
  href: string;
  children: ReactNode;
  active?: boolean;
  external?: boolean;
  onClick?: () => void;
};

function MobileMenuItem({ href, children, active = false, external = false, onClick }: MobileMenuItemProps) {
  return (
    <a
      href={href}
      className={`${styles.mobileMenuItem} ${active ? styles.activeLink : ""}`}
      aria-current={active ? "page" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onClick}
    >
      <span className={styles.mobileMenuItemContent}>{children}</span>
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const syncHash = () => {
      setActiveHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = navItems
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => document.querySelector<HTMLElement>(item.href.replace("/", "")))
      .filter(Boolean) as HTMLElement[];

    let frameId = 0;

    const updateActiveSection = () => {
      const offset = 140;
      let currentHash = "";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        if (window.scrollY + offset >= sectionTop) {
          currentHash = `#${section.id}`;
        }
      });

      setActiveHash((previousHash) => (previousHash === currentHash ? previousHash : currentHash));
    };

    const requestActiveSectionUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return activeHash === href.replace("/", "");
    }
    return pathname === href;
  };

  return (
    <header className={styles.headerWrap}>
      <div className={styles.header}>
        <a
          className={styles.brand}
          href="/"
          aria-label="На главную"
        >
          <Image
            src="/8.png"
            alt="NEXFRAME logo"
            className={styles.logo}
            width={50}
            height={50}
            priority
          />
          <span className={styles.brandText}>
       OnixFrame
      </span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.activeLink : ""}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => {
                if (item.href.startsWith("/#")) {
                  setActiveHash(item.href.replace("/", ""));
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Button variant="icon" href="https://github.com" target="_blank" rel="noreferrer" ariaLabel="GitHub">
            <Github size={18} />
          </Button>
          <Button variant="icon" href="https://www.instagram.com/igor_gordich/" target="_blank" rel="noreferrer" ariaLabel="Instagram">
            <Instagram size={18} />
          </Button>
          <Button variant="icon" href="https://t.me" target="_blank" rel="noreferrer" ariaLabel="Telegram">
            <Send size={17} />
          </Button>
          <Button variant="contact" href="mailto:onixframe.dev@gmail.com">
            <Mail size={17} /> Связаться
          </Button>
          <button
            className={styles.menuButton}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ""}`} onClick={closeMenu}>
        <div className={styles.mobilePanel} onClick={(event) => event.stopPropagation()}>
          <div className={styles.mobileTop}>
            <span>Навигация</span>
            <button className={styles.mobileCloseButton} type="button" onClick={closeMenu} aria-label="Закрыть меню">
              <X size={20} />
            </button>
          </div>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navItems.map((item) => (
              <MobileMenuItem
                key={item.href}
                href={item.href}
                active={isActive(item.href)}
                onClick={() => {
                  if (item.href.startsWith("/#")) {
                    setActiveHash(item.href.replace("/", ""));
                  }
                  closeMenu();
                }}
              >
                {item.label}
              </MobileMenuItem>
            ))}
          </nav>
          <div className={styles.mobileSocials}>
            <MobileMenuItem href="https://github.com" external><Github size={18} /> GitHub</MobileMenuItem>
            <MobileMenuItem href="https://www.instagram.com/igor_gordich/" external><Instagram size={18} /> Instagram</MobileMenuItem>
            <MobileMenuItem href="https://t.me" external><Send size={18} /> Telegram</MobileMenuItem>
          </div>
        </div>
      </div>
    </header>
  );
}
