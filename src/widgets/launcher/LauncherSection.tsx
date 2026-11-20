import { publicAssetPath, siteConfig } from "@/shared/config/site.config";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SystemRequirements } from "@/widgets/launcher/SystemRequirements";

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
] as const;

export function LauncherSection() {
  return (
    <Section id="launcher">
      <Container>
        <div>
          <header>
            <p>Julia Launcher</p>

            <h2>
              О <em>Julia Launcher</em>
            </h2>
          </header>

          <div>
            <div>
              <h3>Что такое лаунчер Julia?</h3>

              <p>
                Julia Launcher — приложение для установки, настройки и запуска
                локальных модулей Julia. Через него можно управлять конфигурацией
                системы, интерфейсным профилем, голосовым взаимодействием,
                обновлениями и уровнем доступа к ресурсам устройства.
              </p>

              <ul>
                <li>
                  Настраивать визуальное представление, голос и стиль речи Julia
                </li>
                <li>
                  Выбирать режим взаимодействия: текстовый, голосовой или
                  мультимодальный
                </li>
                <li>
                  Управлять локальными моделями, памятью, профилями и обновлениями
                </li>
                <li>
                  Контролировать доступ к микрофону, камере, файлам и внешним
                  сервисам
                </li>
                <li>
                  Запускать системные модули с учётом возможностей x86-оборудования
                </li>
              </ul>

              <div>
                <ButtonLink href="/how-to-use">
                  Как пользоваться
                </ButtonLink>
                {" "}
                <ButtonLink href={siteConfig.launcherSourceUrl}>
                  Исходники лаунчера
                </ButtonLink>
              </div>
            </div>

            <div>
              <div>
                {launcherImages.map((image) => (
                  <div key={image.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={publicAssetPath(image.src)}
                      alt={image.alt}
                      width={520}
                      height={360}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SystemRequirements />
          </div>
        </div>
      </Container>
    </Section>
  );
}
