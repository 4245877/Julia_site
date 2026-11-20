import { homeRu } from "@/content/home.ru";
import { publicAssetPath } from "@/shared/config/site.config";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export function RoadmapSection() {
  return (
    <Section id="roadmap">
      <Container>
        <div>
          <header>
            <span>Roadmap</span>

            <h2>
              Дорожная карта{" "}
              <span>разработки</span>
            </h2>

            <p>
              Разработка Julia строится как поэтапное создание
              нейрокогнитивной системы: сначала формируется вычислительное ядро
              и память, затем подключаются модули восприятия, речи,
              планирования, самообучения, безопасности и долгосрочной
              персонализации.
            </p>
          </header>

          <div>
            {homeRu.roadmapCards.map((card, index) => (
              <article key={card.title}>
                <span>Этап {String(index + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <p>{index === 0 ? "Активно" : "Запланировано"}</p>
              </article>
            ))}
          </div>

          <div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publicAssetPath("/images/board.png")}
                alt="Дорожная карта разработки нейрокогнитивной ИИ-системы Julia"
                width={1200}
                height={680}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
