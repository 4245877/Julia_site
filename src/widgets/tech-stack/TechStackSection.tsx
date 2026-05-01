import { homeRu } from "@/content/home.ru";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import styles from "./TechStackSection.module.css";

const TECH_STACK_TITLE_ID = "techStackTitle";

export function TechStackSection() {
  return (
    <Section className={styles.section} aria-labelledby={TECH_STACK_TITLE_ID}>
      <Container className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Спецификация</span>

          <h2 id={TECH_STACK_TITLE_ID} className={styles.title}>
            Технологический <span className={styles.titleAccent}>стек</span>
          </h2>

          <p className={styles.description}>
            Julia — экспериментальная мультимодальная ИИ-система, проектируемая
            как биологически вдохновлённая нейрокогнитивная архитектура. Цель
            проекта — исследовать устойчивое восприятие, долговременную память,
            рассуждение, планирование действий, самообучение и x86-ориентированную
            вычислительную оптимизацию.
          </p>
        </div>

        <div className={styles.ornamentDivider} aria-hidden="true">
          <span className={styles.ornamentSymbol}>✦</span>
        </div>

        <div className={styles.grid}>
          {homeRu.techStack.map((column, columnIndex) => {
            const columnTitleId = `techStackColumn-${columnIndex}`;

            return (
              <article
                key={`${column.columnTitle}-${columnIndex}`}
                className={styles.column}
                aria-labelledby={columnTitleId}
              >
                <h3 id={columnTitleId} className={styles.columnTitle}>
                  <span className={styles.columnTitleMark} aria-hidden="true" />
                  {column.columnTitle}
                </h3>

                {column.groups.map((group, groupIndex) => {
                  const groupTitleId = `techStackColumn-${columnIndex}-group-${groupIndex}`;

                  return (
                    <section
                      key={`${group.title}-${groupIndex}`}
                      className={styles.group}
                      aria-labelledby={groupTitleId}
                    >
                      {groupIndex > 0 && (
                        <hr className={styles.groupSeparator} aria-hidden="true" />
                      )}

                      <h4 id={groupTitleId} className={styles.groupTitle}>
                        {group.title}
                      </h4>

                      <ul className={styles.itemList}>
                        {group.items.map((item, itemIndex) => (
                          <li key={`${item}-${itemIndex}`} className={styles.item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}

                <div className={styles.glowStrip} aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}