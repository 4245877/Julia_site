import { sectionNumber } from "@/shared/config/navigation";
import { siteConfig } from "@/shared/config/site.config";
import { ButtonLink } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Icon } from "@/shared/ui/Icon";
import { ImageFrame } from "@/shared/ui/ImageFrame";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { SystemRequirements } from "@/widgets/launcher/SystemRequirements";
import styles from "./LauncherSection.module.css";

const launcherImages = [
  {
    src: "/images/launcher-1.png",
    alt: "Интерфейс лаунчера Julia — главный экран",
    caption: "Главный экран",
  },
  {
    src: "/images/launcher-2.png",
    alt: "Интерфейс лаунчера Julia — профиль интерфейсной личности",
    caption: "Профиль интерфейсной личности",
  },
  {
    src: "/images/launcher-3.png",
    alt: "Интерфейс лаунчера Julia — настройки голоса",
    caption: "Настройки голоса",
  },
  {
    src: "/images/launcher-4.png",
    alt: "Интерфейс лаунчера Julia — системные настройки",
    caption: "Системные настройки",
  },
] as const;

const launcherAbilities = [
  "Настраивать визуальное представление, голос и стиль речи Julia",
  "Выбирать режим взаимодействия: текстовый, голосовой или мультимодальный",
  "Управлять локальными моделями, памятью, профилями и обновлениями",
  "Контролировать доступ к микрофону, камере, файлам и внешним сервисам",
  "Запускать системные модули с учётом возможностей x86-оборудования",
] as const;

export function LauncherSection() {
  return (
    <Section id="launcher" aria-labelledby="launcher-title">
      <Container>
        <SectionHeading
          index={sectionNumber("launcher")}
          eyebrow="Julia Launcher"
          eyebrowLang="en"
          titleId="launcher-title"
          title={
            <>
              О <em>Julia Launcher</em>
            </>
          }
          layout="stack"
        />

        <div className={styles.layout}>
          <Card className={styles.about}>
            <h3 className={styles.aboutTitle}>Что такое лаунчер Julia?</h3>

            <p className={styles.aboutText}>
              Julia Launcher — приложение для установки, настройки и запуска локальных модулей
              Julia. Через него можно управлять конфигурацией системы, интерфейсным профилем,
              голосовым взаимодействием, обновлениями и уровнем доступа к ресурсам устройства.
            </p>

            <ul className={styles.checklist}>
              {launcherAbilities.map((ability) => (
                <li key={ability}>
                  <span className={styles.check}>
                    <Icon name="check" size={14} strokeWidth={2} />
                  </span>
                  {ability}
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <ButtonLink href="/how-to-use" icon="arrow-right">
                Как пользоваться
              </ButtonLink>
              <ButtonLink href={siteConfig.launcherSourceUrl} variant="secondary" icon="arrow-up-right">
                Исходники лаунчера
              </ButtonLink>
            </div>
          </Card>

          <div className={styles.gallery}>
            {launcherImages.map((image) => (
              <ImageFrame
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={520}
                height={360}
                caption={image.caption}
                className={styles.shot}
              />
            ))}
          </div>
        </div>

        <SystemRequirements />
      </Container>
    </Section>
  );
}
