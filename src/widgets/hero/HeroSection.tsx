import { homeRu } from "@/content/home.ru";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { EmberDot } from "@/shared/ui/EmberDot";
import { QuietPool } from "./QuietPool";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { hero } = homeRu;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.haze} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <EmberDot live />
            <span lang="en">{hero.eyebrow}</span>
          </p>

          <h1 id="hero-title" className={styles.title}>
            {hero.title.lead} <em>{hero.title.accent}</em>
          </h1>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.actions}>
            <ButtonLink href="#architecture" icon="arrow-down">
              {hero.primaryAction}
            </ButtonLink>
            <ButtonLink href="#roadmap" variant="secondary">
              {hero.secondaryAction}
            </ButtonLink>
          </div>
        </div>

        <QuietPool className={styles.visual} />
      </Container>
    </section>
  );
}
