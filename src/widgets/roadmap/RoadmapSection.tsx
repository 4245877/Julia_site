import Image from "next/image";

import { homeRu } from "@/content/home.ru";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

import styles from "./RoadmapSection.module.css";

const getStatus = (index: number) => {
  if (index === 0) {
    return {
      label: "Активно",
      className: styles.statusActive,
    };
  }

  return {
    label: "Запланировано",
    className: styles.statusPlanned,
  };
};

export function RoadmapSection() {
  return (
    <Section id="roadmap" className={styles.section}>
      <Container>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Roadmap</span>

            <h2 className={styles.title}>
              Дорожная карта{" "}
              <span className={styles.titleAccent}>разработки</span>
            </h2>

            <p className={styles.description}>
              Разработка Julia строится как поэтапное создание
              нейрокогнитивной системы: сначала формируется вычислительное ядро
              и память, затем подключаются модули восприятия, речи,
              планирования, самообучения, безопасности и долгосрочной
              персонализации.
            </p>
          </header>

          <div className={styles.ornament} aria-hidden="true">
            <span className={styles.ornamentLine} />
            <span className={styles.ornamentGlyph}>✦</span>
            <span className={styles.ornamentLine} />
          </div>

          <div className={styles.grid}>
            {homeRu.roadmapCards.map((card, index) => {
              const status = getStatus(index);

              return (
                <article key={card.title} className={styles.card}>
                  <span className={styles.cardPhase}>
                    <span className={styles.cardPhaseDot} />
                    Этап {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className={styles.cardTitle}>{card.title}</h3>

                  <p className={styles.cardDescription}>{card.description}</p>

                  <div className={styles.cardStatus}>
                    <span className={status.className}>{status.label}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.boardWrapper}>
            <div className={styles.boardFrame}>
              <Image
                src="/images/board.png"
                alt="Дорожная карта разработки нейрокогнитивной ИИ-системы Julia"
                width={1200}
                height={680}
                className={styles.boardImage}
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}