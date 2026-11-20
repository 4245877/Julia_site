import { homeRu } from "@/content/home.ru";
import { sectionNumber } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/Container";
import { ImageFrame } from "@/shared/ui/ImageFrame";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Tag } from "@/shared/ui/Tag";
import styles from "./RoadmapSection.module.css";

/** Titles read "Этап 1. …"; the stage number is shown separately. */
function stageTitle(title: string) {
  return title.replace(/^Этап\s+\d+\.\s*/, "");
}

export function RoadmapSection() {
  return (
    <Section id="roadmap" aria-labelledby="roadmap-title">
      <Container className={styles.layout}>
        <div className={styles.aside}>
          <div className={styles.sticky}>
            <SectionHeading
              layout="stack"
              index={sectionNumber("roadmap")}
              eyebrow="Roadmap"
              eyebrowLang="en"
              titleId="roadmap-title"
              title={
                <>
                  Дорожная карта <em>разработки</em>
                </>
              }
              lead="Разработка Julia строится как поэтапное создание нейрокогнитивной системы: сначала формируется вычислительное ядро и память, затем подключаются модули восприятия, речи, планирования, самообучения, безопасности и долгосрочной персонализации."
              className={styles.heading}
            />

            <ImageFrame
              src="/images/board.png"
              alt="Дорожная карта разработки нейрокогнитивной ИИ-системы Julia"
              width={1200}
              height={680}
              className={styles.board}
            />
          </div>
        </div>

        <ol className={styles.timeline}>
          {homeRu.roadmapCards.map((card, index) => {
            const active = index === 0;
            return (
              <li key={card.title} className={cn(styles.stage, active && styles.active)} data-reveal>
                <span className={styles.marker} aria-hidden="true" />
                <article className={styles.body}>
                  <div className={styles.meta}>
                    <span className={styles.number}>Этап {String(index + 1).padStart(2, "0")}</span>
                    <Tag tone={active ? "mauve" : "neutral"} dot={active ? "live" : undefined}>
                      {active ? "Активно" : "Запланировано"}
                    </Tag>
                  </div>
                  <h3 className={styles.title}>{stageTitle(card.title)}</h3>
                  <p className={styles.text}>{card.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
