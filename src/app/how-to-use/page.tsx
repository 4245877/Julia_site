import { Container } from "@/shared/ui/Container";
import { ButtonLink } from "@/shared/ui/Button";

export default function HowToUsePage() {
  return (
    <main className="min-h-screen bg-slate-950 py-20 text-white">
      <Container>
        <h1 className="mb-6 text-4xl font-bold">Как пользоваться Julia Launcher</h1>

        <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
          Эта страница подготовлена как заглушка. Здесь можно разместить инструкцию
          по установке, настройке профиля, управлению локальными модулями и запуску Julia.
        </p>

        <ButtonLink href="/">Вернуться на главную</ButtonLink>
      </Container>
    </main>
  );
}