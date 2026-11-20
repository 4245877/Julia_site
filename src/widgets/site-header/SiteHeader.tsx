"use client";

import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";
import { ThemeToggle } from "@/features/theme-switcher/ui/ThemeToggle";
import { sectionIds, sectionNav, type SectionId } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Dialog } from "@/shared/ui/Dialog";
import { EmberDot } from "@/shared/ui/EmberDot";
import { Icon } from "@/shared/ui/Icon";
import { useActiveSection, useScrolledPast } from "./model/usePageScroll";
import styles from "./SiteHeader.module.css";

const MENU_ID = "site-menu";

function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn(styles.brand, className)} aria-label="Julia AI — на главную">
      <span className={styles.wordmark} aria-hidden="true">
        Julia
      </span>
      <EmberDot live className={styles.brandEmber} />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const scrolled = useScrolledPast(8);
  const activeId = useActiveSection(sectionIds, isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingTarget = useRef<SectionId | null>(null);

  const hrefFor = (id: SectionId) => (isHome ? `#${id}` : `/#${id}`);

  function navigateFromMenu(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    if (isHome) {
      // Close the curtain first, then glide to the section and move focus there.
      event.preventDefault();
      pendingTarget.current = id;
    }
    setMenuOpen(false);
  }

  function revealPendingSection() {
    const id = pendingTarget.current;
    pendingTarget.current = null;
    const target = id ? document.getElementById(id) : null;
    if (!id || !target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    target.focus({ preventScroll: true });
    window.history.pushState(null, "", `#${id}`);
  }

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <Container className={styles.bar}>
        <Brand />

        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {sectionNav
              .filter((item) => "primary" in item && item.primary)
              .map((item) => {
                const current = activeId === item.id;
                const linkProps = {
                  className: styles.navLink,
                  "aria-current": current ? ("true" as const) : undefined,
                };
                return (
                  <li key={item.id}>
                    {isHome ? (
                      <a href={hrefFor(item.id)} {...linkProps}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={hrefFor(item.id)} {...linkProps}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher className={styles.language} />
          <ThemeToggle />
          <ButtonLink href={hrefFor("contact")} variant="secondary" size="sm" className={styles.support}>
            <EmberDot className={styles.supportEmber} />
            Поддержать
          </ButtonLink>
          <button
            type="button"
            className={styles.menuButton}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen(true)}
          >
            <span className={styles.menuGlyph} aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="visually-hidden">Открыть меню</span>
          </button>
        </div>
      </Container>

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAfterClose={revealPendingSection}
        label="Меню сайта"
        variant="sheet"
        className={styles.menuDialog}
      >
        <div id={MENU_ID} className={styles.menu}>
          <div className={styles.menuTop}>
            <Brand />
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              data-autofocus
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav aria-label="Разделы сайта">
            <ol className={styles.menuList}>
              {sectionNav.map((item, index) => {
                const linkProps = {
                  className: styles.menuLink,
                  style: { "--i": index } as CSSProperties,
                  "aria-current": activeId === item.id ? ("true" as const) : undefined,
                  onClick: (event: MouseEvent<HTMLAnchorElement>) => navigateFromMenu(event, item.id),
                };
                const content = (
                  <>
                    <span className={styles.menuIndex}>{item.index}</span>
                    <span className={styles.menuLabel}>{item.label}</span>
                    <Icon name="arrow-right" className={styles.menuArrow} />
                  </>
                );
                return (
                  <li key={item.id}>
                    {isHome ? (
                      <a href={hrefFor(item.id)} {...linkProps}>
                        {content}
                      </a>
                    ) : (
                      <Link href={hrefFor(item.id)} {...linkProps}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className={styles.menuFooter}>
            <ThemeToggle variant="row" />
            <div className={styles.menuLanguage}>
              <span id="menu-language-label" className={styles.menuLanguageLabel}>
                Язык
              </span>
              <LanguageSwitcher labelledBy="menu-language-label" />
            </div>
            <ButtonLink
              href={hrefFor("contact")}
              block
              icon="arrow-right"
              onClick={(event) => navigateFromMenu(event, "contact")}
            >
              Поддержать разработку
            </ButtonLink>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
