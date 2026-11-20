import { homeRu } from "@/content/home.ru";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

const TECH_STACK_TITLE_ID = "techStackTitle";

export function TechStackSection() {
  return (
    <Section aria-labelledby={TECH_STACK_TITLE_ID}>
      <Container>
        <div>
          <span>Спецификация</span>

          <h2 id={TECH_STACK_TITLE_ID}>
            Технологический <span>стек</span>
          </h2>

          <p>
            Julia — экспериментальная мультимодальная ИИ-система, проектируемая
            как биологически вдохновлённая нейрокогнитивная архитектура. Цель
            проекта — исследовать устойчивое восприятие, долговременную память,
            рассуждение, планирование действий, самообучение и x86-ориентированную
            вычислительную оптимизацию.
          </p>
        </div>

        <div>
          {homeRu.techStack.map((column, columnIndex) => {
            const columnTitleId = `techStackColumn-${columnIndex}`;

            return (
              <article
                key={`${column.columnTitle}-${columnIndex}`}
                aria-labelledby={columnTitleId}
              >
                <h3 id={columnTitleId}>{column.columnTitle}</h3>

                {column.groups.map((group, groupIndex) => {
                  const groupTitleId = `techStackColumn-${columnIndex}-group-${groupIndex}`;

                  return (
                    <section
                      key={`${group.title}-${groupIndex}`}
                      aria-labelledby={groupTitleId}
                    >
                      <h4 id={groupTitleId}>{group.title}</h4>

                      <ul>
                        {group.items.map((item, itemIndex) => (
                          <li key={`${item}-${itemIndex}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
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
