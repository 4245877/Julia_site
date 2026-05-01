import { homeRu } from "@/content/home.ru";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function FeaturesSection() {
  return (
    <Section id="features" className="bg-slate-900">
      <Container>
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          Ключевые возможности Julia
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {homeRu.featureCards.map((card) => (
            <Card key={card.title} className="bg-slate-950/80">
              <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
              <p className="leading-7 text-slate-300">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}