import Image from "next/image";
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
];

export function LauncherSection() {
  return (
    <Section id="launcher" className="bg-slate-950">
      <Container>
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Скачать Julia Launcher
        </h2>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Что такое лаунчер Julia?</h3>

            <p className="mb-6 leading-8 text-slate-300">
              Julia Launcher — приложение для установки, настройки и запуска
              локальных модулей Julia. Через него можно управлять конфигурацией
              системы, интерфейсным профилем, голосовым взаимодействием,
              обновлениями и уровнем доступа к ресурсам устройства.
            </p>

            <ul className="mb-8 ml-6 list-disc space-y-2 text-slate-200">
              <li>Настраивать визуальное представление, голос и стиль речи Julia</li>
              <li>Выбирать режим взаимодействия: текстовый, голосовой или мультимодальный</li>
              <li>Управлять локальными моделями, памятью, профилями и обновлениями</li>
              <li>Контролировать доступ к микрофону, камере, файлам и внешним сервисам</li>
              <li>Запускать системные модули с учётом возможностей x86-оборудования</li>
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/how-to-use">Как пользоваться</ButtonLink>
              <ButtonLink href="#" variant="secondary">
                Скачать лаунчер
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {launcherImages.map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={520}
                  height={360}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <SystemRequirements />
      </Container>
    </Section>
  );
}