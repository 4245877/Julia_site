import { homeRu } from "@/content/home.ru";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <header className="header-gradient relative py-24">
      <LanguageSwitcher />

      <Container className="text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.28em] text-blue-300">
          {homeRu.hero.eyebrow}
        </p>

        <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          {homeRu.hero.title}
        </h1>

        <p className="mx-auto mb-10 max-w-4xl text-lg leading-8 text-slate-300 md:text-xl">
          {homeRu.hero.description}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="#architecture">{homeRu.hero.primaryAction}</ButtonLink>
          <ButtonLink href="#roadmap" variant="secondary">
            {homeRu.hero.secondaryAction}
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}