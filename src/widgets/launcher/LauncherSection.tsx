import Image from "next/image";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SystemRequirements } from "@/widgets/launcher/SystemRequirements";
import styles from "./LauncherSection.module.css";

const launcherImages = [
  {
    src: "/images/launcher-1.png",
    alt: "Интерфейс лаунчера Julia — главный экран",
  },
  {
    src: "/images/launcher-2.png",
    alt: "Интерфейс лаунчера Julia — профиль интерфейсной личности",
  },
  {
    src: "/images/launcher-3.png",
    alt: "Интерфейс лаунчера Julia — настройки голоса",
  },
  {
    src: "/images/launcher-4.png",
    alt: "Интерфейс лаунчера Julia — системные настройки",
  },
];

export function LauncherSection() {
  return (
    <Section id="launcher" className={styles.section}>
      <span className={styles.thornBar} aria-hidden="true" />
      <span className={styles.thornBarGold} aria-hidden="true" />

      <Container>
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Julia Launcher</p>

            <h2 className={styles.title}>
              Скачать <em>Julia Launcher</em>
            </h2>

            <div className={styles.titleRule} aria-hidden="true">
              <span className={styles.titleRuleDiamond} />
            </div>
          </header>

          <div className={styles.body}>
            <div className={styles.textCol}>
              <h3 className={styles.subtitle}>Что такое лаунчер Julia?</h3>

              <p className={styles.description}>
                Julia Launcher — приложение для установки, настройки и запуска
                локальных модулей Julia. Через него можно управлять конфигурацией
                системы, интерфейсным профилем, голосовым взаимодействием,
                обновлениями и уровнем доступа к ресурсам устройства.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  Настраивать визуальное представление, голос и стиль речи Julia
                </li>
                <li className={styles.featureItem}>
                  Выбирать режим взаимодействия: текстовый, голосовой или
                  мультимодальный
                </li>
                <li className={styles.featureItem}>
                  Управлять локальными моделями, памятью, профилями и обновлениями
                </li>
                <li className={styles.featureItem}>
                  Контролировать доступ к микрофону, камере, файлам и внешним
                  сервисам
                </li>
                <li className={styles.featureItem}>
                  Запускать системные модули с учётом возможностей x86-оборудования
                </li>
              </ul>

              <div className={styles.actions}>
                <ButtonLink href="/how-to-use" className={styles.btnPrimary}>
                  Как пользоваться
                </ButtonLink>

                <ButtonLink
                  href="#"
                  variant="secondary"
                  className={styles.btnDownload}
                >
                  Скачать лаунчер
                </ButtonLink>
              </div>
            </div>

            <div className={styles.imageCol}>
              <div className={styles.imageGrid}>
                {launcherImages.map((image) => (
                  <div key={image.src} className={styles.imageCard}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={520}
                      height={360}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.systemReqs}>
            <SystemRequirements />
          </div>
        </div>
      </Container>
    </Section>
  );
}