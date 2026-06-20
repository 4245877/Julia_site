import Image from "next/image";
import { SupportButton } from "@/features/donation-flow/ui/SupportButton";
import styles from "./DeveloperJourneySection.module.css";

export function DeveloperJourneySection() {
  const raised = 12.53;
  const goal = 6_774_053;
  const progressPercent = (raised / goal) * 100;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2
          className={`${styles.heading} ${styles.animateUp} ${styles.delay1}`}
        >
          Путь разработки <em>Julia</em>
        </h2>

        <div className={styles.profileBlock}>
          <div
            className={`${styles.avatarWrapper} ${styles.animateUp} ${styles.delay2}`}
          >
            <Image
              src="/images/developer.png"
              alt="Михаил Головач"
              width={180}
              height={180}
              className={styles.avatar}
              priority={false}
            />
          </div>

          <p
            className={`${styles.description} ${styles.animateUp} ${styles.delay3}`}
          >
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

          <p
            className={`${styles.callout} ${styles.animateUp} ${styles.delay4}`}
          >
            Поддержите исследовательскую разработку Julia
          </p>
        </div>

        <div className={styles.ornamentDivider} aria-hidden="true">
          <span>✦</span>
        </div>

        <div
          className={`${styles.progressCard} ${styles.animateUp} ${styles.delay5}`}
        >
          <div className={styles.fundingStats}>
            <span className={styles.fundingRaised}>
              {raised.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <span className={styles.fundingCurrency}>$</span>

            <span className={styles.fundingSeparator}>из</span>

            <span className={styles.fundingGoal}>
              {goal.toLocaleString("en-US")}
            </span>

            <span className={styles.fundingCurrency}>$</span>
          </div>

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label="Прогресс финансирования разработки Julia"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={raised}
          >
            <div
              className={styles.progressFill}
              style={{
                width: `${progressPercent}%`,
              }}
            />
          </div>

          <div className={styles.progressMeta}>
            <span className={styles.progressPercent}>
              {progressPercent.toFixed(6)}%
            </span>

            <span className={styles.progressLabel}>собрано</span>
          </div>

          <div className={styles.supportArea}>
            <div className={styles.supportBtnWrapper}>
              <SupportButton />
            </div>

            <p className={styles.supportNote}>
              Каждая поддержка помогает продолжать разработку.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}