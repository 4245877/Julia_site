import { homeRu } from "@/content/home.ru";
import { sectionNumber } from "@/shared/config/navigation";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Tag } from "@/shared/ui/Tag";
import styles from "./TechStackSection.module.css";

const TECH_STACK_TITLE_ID = "techStackTitle";

/** "Term — description" → term and description, for an easily scanned list. */
function splitItem(item: string) {
  const [term, ...rest] = item.split(" — ");
  return { term, description: rest.join(" — ") };
}

export function TechStackSection() {
  return (
    <Section id="tech-stack" aria-labelledby={TECH_STACK_TITLE_ID}>
      <Container>
        <SectionHeading
          index={sectionNumber("tech-stack")}
          eyebrow="Спецификация"
          titleId={TECH_STACK_TITLE_ID}
          title={
            <>
              Технологический <em>стек</em>
            </>
          }
          lead="Julia — экспериментальная мультимодальная ИИ-система, проектируемая как биологически вдохновлённая нейрокогнитивная архитектура. Цель проекта — исследовать устойчивое восприятие, долговременную память, рассуждение, планирование действий, самообучение и x86-ориентированную вычислительную оптимизацию."
        />

        <div className={styles.columns}>
          {homeRu.techStack.map((column, columnIndex) => {
            const columnTitleId = `techStackColumn-${columnIndex}`;

            return (
              <article
                key={`${column.columnTitle}-${columnIndex}`}
                aria-labelledby={columnTitleId}
                className={styles.column}
              >
                <h3 id={columnTitleId} className={styles.columnTitle}>
                  <span className={styles.columnMark} aria-hidden="true">
                    {columnIndex === 0 ? "A" : "B"}
                  </span>
                  {column.columnTitle}
                </h3>

                {column.groups.map((group, groupIndex) => {
                  const groupTitleId = `techStackColumn-${columnIndex}-group-${groupIndex}`;
                  const isGlossary = group.items.some((item) => item.includes(" — "));

                  return (
                    <section
                      key={`${group.title}-${groupIndex}`}
                      aria-labelledby={groupTitleId}
                      className={styles.group}
                      data-reveal
                    >
                      <h4 id={groupTitleId} className={styles.groupTitle}>
                        {group.title}
                      </h4>

                      {isGlossary ? (
                        <ul className={styles.items}>
                          {group.items.map((item, itemIndex) => {
                            const { term, description } = splitItem(item);
                            return (
                              <li key={`${item}-${itemIndex}`} className={styles.item}>
                                <span className={styles.term}>{term}</span>
                                {description && <span className={styles.description}>{description}</span>}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <ul className={styles.tags} lang="en">
                          {group.items.map((item, itemIndex) => (
                            <li key={`${item}-${itemIndex}`}>
                              <Tag tone="sage">{item}</Tag>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  );
                })}
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
