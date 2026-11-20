import { SupportButton } from "@/features/donation-flow/ui/SupportButton";
import { sectionNumber } from "@/shared/config/navigation";
import { Container } from "@/shared/ui/Container";
import { EmberDot } from "@/shared/ui/EmberDot";
import { ImageFrame } from "@/shared/ui/ImageFrame";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import styles from "./DeveloperJourneySection.module.css";

const LOCALE = "ru-RU";

export function DeveloperJourneySection() {
  const raised = 12.53;
  const goal = 6_774_053;
  const progressPercent = (raised / goal) * 100;

  return (
    <Section id="contact" tone="evening" aria-labelledby="developer-title" className={styles.section}>
      <div className={styles.light} aria-hidden="true" />

      <Container className={styles.layout}>
        <div className={styles.story}>
          <SectionHeading
            layout="stack"
            index={sectionNumber("contact")}
            eyebrow="Developer"
            eyebrowLang="en"
            titleId="developer-title"
            title={
              <>
                Путь разработки <em>Julia</em>
              </>
            }
            className={styles.heading}
          />

          <div className={styles.author}>
            <ImageFrame
              src="/images/developer.png"
              alt="Михаил Головач"
              width={180}
              height={180}
              shape="round"
              className={styles.portrait}
            />

            <p className={styles.storyText}>
              Julia началась как личный исследовательский проект, но постепенно выросла в попытку
              спроектировать более глубокую ИИ-архитектуру: с памятью, вниманием, внутренним
              состоянием, планированием и модульной системой восприятия. Основной инженерный фокус
              проекта — низкоуровневый контроль, производительность и возможность разворачивать
              ключевые компоненты на x86-платформе. Поэтому в основе разработки находятся C++,
              системное проектирование, нейросетевые модели, базы знаний, механизмы безопасности
              и интерфейсы человеко-машинного взаимодействия.
            </p>
          </div>
        </div>

        <div className={styles.support}>
          <h3 className={styles.supportTitle}>Поддержите исследовательскую разработку Julia</h3>

          <p className={styles.amount}>
            <span className={styles.raised}>
              {raised.toLocaleString(LOCALE, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {" $"}
            </span>
            <span className={styles.goal}>из {goal.toLocaleString(LOCALE)} $</span>
          </p>

          {/* A tiny ember marks where the path begins: the bar itself is
              still too short to see. */}
          <div className={styles.progressTrack}>
            <progress
              className={styles.progress}
              aria-label="Прогресс финансирования разработки Julia"
              max={goal}
              value={raised}
            />
            <EmberDot live className={styles.progressEmber} />
          </div>

          <p className={styles.percent}>
            {progressPercent.toLocaleString(LOCALE, {
              minimumFractionDigits: 6,
              maximumFractionDigits: 6,
            })}
            % собрано
          </p>

          <SupportButton className={styles.supportButton} />

          <p className={styles.supportNote}>Каждая поддержка помогает продолжать разработку.</p>
        </div>
      </Container>
    </Section>
  );
}
