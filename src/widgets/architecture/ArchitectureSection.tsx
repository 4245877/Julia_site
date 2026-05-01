import { homeRu } from "@/content/home.ru";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function ArchitectureSection() {
  return (
    <Section id="architecture" className="bg-slate-950">
      <Container>
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Не чат-бот. Не оболочка. Когнитивная система.
          </h2>

          <p className="text-lg leading-8 text-slate-300">
            Julia проектируется как многоуровневая архитектура, где отдельные
            модули отвечают за восприятие, память, внимание, внутреннее
            состояние, принятие решений и обучение на опыте. Главная цель —
            создать не набор скриптов, а устойчивую систему с долговременным
            контекстом и адаптивным поведением.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {homeRu.architectureCards.map((card) => (
            <Card key={card.title}>
              <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
              <p className="leading-7 text-slate-300">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}