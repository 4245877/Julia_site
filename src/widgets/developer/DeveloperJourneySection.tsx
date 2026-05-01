import Image from "next/image";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SupportButton } from "@/features/donation-flow/ui/SupportButton";

export function DeveloperJourneySection() {
  return (
    <Section className="bg-light">
      <Container>
        <h2 className="mb-8 text-3xl font-bold text-[var(--dark-burgundy)]">
          Путь разработки Julia
        </h2>

        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/developer.png"
            alt="Михаил Головач"
            width={180}
            height={180}
            className="pulse mb-6 rounded-full border border-slate-200 object-cover"
          />

          <p className="mb-4 max-w-5xl text-lg leading-8 text-slate-800">
            Julia началась как личный исследовательский проект, но постепенно
            выросла в попытку спроектировать более глубокую ИИ-архитектуру: с
            памятью, вниманием, внутренним состоянием, планированием и модульной
            системой восприятия. Основной инженерный фокус проекта —
            низкоуровневый контроль, производительность и возможность
            разворачивать ключевые компоненты на x86-платформе. Поэтому в основе
            разработки находятся C++, системное проектирование, нейросетевые
            модели, базы знаний, механизмы безопасности и интерфейсы
            человеко-машинного взаимодействия.
          </p>

          <p className="text-lg font-bold text-slate-900">
            Поддержите исследовательскую разработку Julia
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
          <div className="mb-4 text-center text-lg font-semibold text-slate-900">
            <span>12.53</span> $ <span className="text-slate-500">из</span>{" "}
            <span>6774053</span> $
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: "0.000185%",
              }}
            />
          </div>

          <div className="mt-6 text-center">
            <SupportButton />
          </div>
        </div>
      </Container>
    </Section>
  );
}