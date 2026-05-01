import { homeRu } from "@/content/home.ru";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

import styles from "./ArchitectureSection.module.css";

export function ArchitectureSection() {
  return (
    <Section id="architecture" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Architecture</p>

          <h2 className={styles.heading}>
            Не чат-бот. Не оболочка.{" "}
            <span className={styles.headingAccent}>Когнитивная система.</span>
          </h2>

          <p className={styles.description}>
            Julia проектируется как многоуровневая архитектура, где отдельные
            модули отвечают за восприятие, память, внимание, внутреннее
            состояние, принятие решений и обучение на опыте. Главная цель —
            создать не набор скриптов, а устойчивую систему с долговременным
            контекстом и адаптивным поведением.
          </p>
        </div>

        <div className={styles.ornamentRow} aria-hidden="true">
          <span className={styles.ornamentLine} />
          <span className={styles.ornamentGlyph}>✦</span>
          <span className={styles.ornamentLine} />
        </div>

        <div className={styles.grid}>
          {homeRu.architectureCards.map((card, index) => (
            <article className={styles.card} key={card.title}>
              <span className={styles.cardIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className={styles.cardTitle}>{card.title}</h3>

              <p className={styles.cardDescription}>{card.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}