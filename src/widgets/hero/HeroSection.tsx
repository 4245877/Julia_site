import { homeRu } from "@/content/home.ru";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.thorns} aria-hidden="true" />
      <div className={styles.goldLine} aria-hidden="true" />

      <div className={styles.langSlot}>
        <LanguageSwitcher />
      </div>

      <Container className={styles.inner}>
        <p className={styles.eyebrow}>{homeRu.hero.eyebrow}</p>

        <h1 className={styles.title}>{homeRu.hero.title}</h1>

        <p className={styles.description}>{homeRu.hero.description}</p>

        <div className={styles.actions}>
          <ButtonLink href="#architecture">
            {homeRu.hero.primaryAction}
          </ButtonLink>

          <ButtonLink href="#roadmap" variant="secondary">
            {homeRu.hero.secondaryAction}
          </ButtonLink>
        </div>
      </Container>

      <div className={styles.fadeEdge} aria-hidden="true" />

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollHint__label}>Дальше</span>
        <span className={styles.scrollHint__line} />
      </div>
    </header>
  );
}