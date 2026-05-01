import { homeRu } from "@/content/home.ru";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

import styles from "./FeaturesSection.module.css";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FeaturesSection() {
  return (
    <Section id="features" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.eyebrow}>Julia AI</div>

            <h2 className={styles.title}>
              Ключевые возможности{" "}
              <span className={styles.titleAccent}>Julia</span>
            </h2>

            <p className={styles.subtitle}>
              Инструменты, которые помогают мыслить яснее, работать быстрее и
              аккуратно выстраивать архитектуру решений.
            </p>

            <div className={styles.ornament} aria-hidden="true">
              <span className={styles.ornamentLine} />
              <span className={styles.ornamentGlyph}>✦</span>
              <span className={styles.ornamentLine} />
            </div>
          </header>

          <div className={styles.grid}>
            {homeRu.featureCards.map((card, index) => {
              const isFeatured = index === 1;
              const isGold = index === 2;

              return (
                <Card
                  key={card.title}
                  className={cn(
                    styles.card,
                    isFeatured && styles["card--featured"],
                    isGold && styles["card--gold"],
                  )}
                >
                  <span className={styles.cardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.iconWrap} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3L14.7 9.3L21 12L14.7 14.7L12 21L9.3 14.7L3 12L9.3 9.3L12 3Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className={styles.cardTitle}>{card.title}</h3>

                  <div className={styles.cardDivider} />

                  <p className={styles.cardDescription}>{card.description}</p>

                  <div className={styles.cardTags} aria-hidden="true">
                    <span className={styles.cardTag}>Precision</span>
                    <span className={styles.cardTag}>Flow</span>
                  </div>

                  <span className={styles.strip} aria-hidden="true" />
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}