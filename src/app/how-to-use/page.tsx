import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site.config";
import { Container } from "@/shared/ui/Container";
import { ButtonLink } from "@/shared/ui/Button";

export const metadata: Metadata = {
  title: "Как пользоваться Julia Launcher",
  description: "Доступность Julia Launcher и демонстрация настроек профиля.",
};

export default function HowToUsePage() {
  return (
    <main>
      <Container>
        <h1>Как пользоваться Julia Launcher</h1>

        <p>
          Публичный установщик пока недоступен.{" "}
          <a href={siteConfig.launcherSourceUrl}>Исходный код Julia Launcher</a>{" "}
          опубликован на GitHub. На главной странице доступны системные требования
          и демонстрация настроек профиля.
        </p>

        <ButtonLink href="/">Вернуться на главную</ButtonLink>
      </Container>
    </main>
  );
}
