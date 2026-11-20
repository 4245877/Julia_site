import { homeRu } from "@/content/home.ru";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function FeaturesSection() {
  return (
    <Section id="features">
      <Container>
        <div>
          <header>
            <div>Julia AI</div>

            <h2>
              Ключевые возможности{" "}
              <span>Julia</span>
            </h2>

            <p>
              Инструменты, которые помогают мыслить яснее, работать быстрее и
              аккуратно выстраивать архитектуру решений.
            </p>
          </header>

          <div>
            {homeRu.featureCards.map((card) => (
              <Card key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
