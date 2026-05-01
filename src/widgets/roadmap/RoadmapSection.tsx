import Image from "next/image";
import { homeRu } from "@/content/home.ru";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function RoadmapSection() {
  return (
    <Section id="roadmap" className="bg-slate-950">
      <Container>
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Дорожная карта разработки
          </h2>

          <p className="text-lg leading-8 text-slate-300">
            Разработка Julia строится как поэтапное создание нейрокогнитивной
            системы: сначала формируется вычислительное ядро и память, затем
            подключаются модули восприятия, речи, планирования, самообучения,
            безопасности и долгосрочной персонализации.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 text-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {homeRu.roadmapCards.map((card) => (
            <Card key={card.title}>
              <h3 className="mb-3 text-xl font-semibold">{card.title}</h3>
              <p className="leading-7 text-slate-300">{card.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Image
            src="/images/board.png"
            alt="Дорожная карта разработки нейрокогнитивной ИИ-системы Julia"
            width={1200}
            height={680}
            className="w-full max-w-5xl rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </Container>
    </Section>
  );
}