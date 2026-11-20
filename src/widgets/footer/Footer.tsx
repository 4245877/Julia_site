import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/shared/config/site.config";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/Container";
import { EmberDot } from "@/shared/ui/EmberDot";
import { Icon } from "@/shared/ui/Icon";
import { Tag } from "@/shared/ui/Tag";
import styles from "./Footer.module.css";

const sectionLinks = [
  { id: "architecture", label: "Архитектура" },
  { id: "roadmap", label: "Roadmap" },
  { id: "launcher", label: "Launcher" },
] as const;

const communityLinks = [
  { href: siteConfig.discussionsUrl, label: "Обсуждения на GitHub" },
  { href: siteConfig.launcherSourceUrl, label: "Исходники лаунчера" },
] as const;

type FooterProps = {
  /** On the home page the footer continues the evening sheet of the last section. */
  home?: boolean;
};

function SectionLink({ home, id, children }: { home: boolean; id: string; children: ReactNode }) {
  return home ? (
    <a href={`#${id}`} className={styles.link}>
      {children}
    </a>
  ) : (
    <Link href={`/#${id}`} className={styles.link}>
      {children}
    </Link>
  );
}

export function Footer({ home = false }: FooterProps) {
  return (
    <footer className={cn("scope-evening", styles.footer, home && styles.continued)}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <Link href="/" className={styles.brand} aria-label="Julia AI — на главную">
              <span aria-hidden="true">Julia</span>
              <EmberDot />
            </Link>
            <span className={styles.brandNote} lang="en">
              AI Research Project
            </span>
          </div>

          <div className={styles.navs}>
            <nav aria-label="Footer navigation">
              <ul className={styles.list}>
                {sectionLinks.map((link) => (
                  <li key={link.id}>
                    <SectionLink home={home} id={link.id}>
                      {link.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Сообщество">
              <ul className={styles.list}>
                {communityLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                      <Icon name="arrow-up-right" size={14} className={styles.external} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p className={styles.tagline} lang="en">
          Elegant intelligence. <em>Quiet research.</em> Julia AI.
        </p>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} <em>Julia AI</em>. Экспериментальный исследовательский
            проект.
          </p>

          <Tag tone="neutral" dot="live" lang="en">
            Active
          </Tag>
        </div>
      </Container>
    </footer>
  );
}
