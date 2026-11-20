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
    <main className="min-h-screen bg-slate-950 py-20 text-white">
      <Container>
        <h1 className="mb-6 text-4xl font-bold">Как пользоваться Julia Launcher</h1>

        <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
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
