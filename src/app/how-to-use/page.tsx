import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site.config";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Icon, type IconName } from "@/shared/ui/Icon";
import { Notice } from "@/shared/ui/Notice";
import { Footer } from "@/widgets/footer/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Как пользоваться Julia Launcher",
  description: "Доступность Julia Launcher и демонстрация настроек профиля.",
};

const available: readonly {
  href: string;
  icon: IconName;
  title: string;
  text: string;
  external?: boolean;
}[] = [
  {
    href: siteConfig.launcherSourceUrl,
    icon: "github",
    title: "Исходный код Julia Launcher",
    text: "Опубликован на GitHub — можно изучить и собрать самостоятельно.",
    external: true,
  },
  {
    href: "/#system-requirements",
    icon: "chip",
    title: "Системные требования",
    text: "Ориентиры для базового, рекомендуемого и исследовательского режимов.",
  },
  {
    href: "/#character-customization",
    icon: "sliders",
    title: "Демонстрация настроек профиля",
    text: "Внешний образ, голос и поведение интерфейсной личности.",
  },
];

export default function HowToUsePage() {
  return (
    <>
      <main id="main" tabIndex={-1} className={styles.main}>
        <Container size="narrow">
          <nav aria-label="Навигационная цепочка" className={styles.breadcrumbs}>
            <ol>
              <li>
                <Link href="/">Главная</Link>
              </li>
              <li aria-current="page">Как пользоваться</li>
            </ol>
          </nav>

          <p className={styles.eyebrow} lang="en">
            Julia Launcher
          </p>
          <h1 className={styles.title}>
            Как пользоваться <em>Julia Launcher</em>
          </h1>

          <Notice tone="warning" title="Публичный установщик пока недоступен." className={styles.notice}>
            <p>
              <a href={siteConfig.launcherSourceUrl}>Исходный код Julia Launcher</a> опубликован на
              GitHub. На главной странице доступны системные требования и демонстрация настроек
              профиля.
            </p>
          </Notice>

          <h2 className={styles.subtitle}>Что доступно сейчас</h2>

          <ul className={styles.links}>
            {available.map((item) => {
              const content = (
                <>
                  <span className={styles.linkIcon}>
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span className={styles.linkText}>
                    <span className={styles.linkTitle}>{item.title}</span>
                    <span className={styles.linkDescription}>{item.text}</span>
                  </span>
                  <Icon
                    name={item.external ? "arrow-up-right" : "arrow-right"}
                    size={20}
                    className={styles.linkArrow}
                  />
                </>
              );

              return (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} className={styles.linkCard}>
                      {content}
                    </a>
                  ) : (
                    <Link href={item.href} className={styles.linkCard}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <ButtonLink href="/" variant="secondary" icon="arrow-left" iconPosition="start">
            Вернуться на главную
          </ButtonLink>
        </Container>
      </main>
      <Footer />
    </>
  );
}
