import { homeRu } from "@/content/home.ru";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function TechStackSection() {
  return (
    <Section
      className="bg-gradient-to-r from-slate-900 to-slate-800"
      aria-labelledby="techStackTitle"
    >
      <Container>
        <h2 id="techStackTitle" className="mb-6 text-3xl font-bold md:text-4xl">
          Технологический стек
        </h2>

        <p className="mb-10 max-w-4xl text-lg leading-8 text-slate-300">
          Julia — экспериментальная мультимодальная ИИ-система, проектируемая
          как биологически вдохновлённая нейрокогнитивная архитектура. Цель
          проекта — исследовать устойчивое восприятие, долговременную память,
          рассуждение, планирование действий, самообучение и x86-ориентированную
          вычислительную оптимизацию.
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {homeRu.techStack.map((column) => (
            <div key={column.columnTitle}>
              <h3 className="mb-4 text-2xl font-bold">{column.columnTitle}</h3>

              {column.groups.map((group) => (
                <div key={group.title} className="mt-6">
                  <h4 className="mb-2 text-xl font-semibold">{group.title}</h4>

                  <ul className="ml-6 list-disc space-y-2 text-slate-200">
                    {group.items.map((item) => (
                      <li key={item} className="leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}