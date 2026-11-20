import { homeRu } from "@/content/home.ru";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function ArchitectureSection() {
  return (
    <Section id="architecture">
      <Container>
        <div>
          <p>Architecture</p>

          <h2>
            Не чат-бот. Не оболочка.{" "}
            <span>Когнитивная система.</span>
          </h2>

          <p>
            Julia проектируется как многоуровневая архитектура, где отдельные
            модули отвечают за восприятие, память, внимание, внутреннее
            состояние, принятие решений и обучение на опыте. Главная цель —
            создать не набор скриптов, а устойчивую систему с долговременным
            контекстом и адаптивным поведением.
          </p>
        </div>

        <div>
          {homeRu.architectureCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>

              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
