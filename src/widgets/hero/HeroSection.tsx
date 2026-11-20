import { homeRu } from "@/content/home.ru";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";

export function HeroSection() {
  return (
    <header>
      <div>
        <LanguageSwitcher />
      </div>

      <Container>
        <p>{homeRu.hero.eyebrow}</p>

        <h1>{homeRu.hero.title}</h1>

        <p>{homeRu.hero.description}</p>

        <div>
          <ButtonLink href="#architecture">
            {homeRu.hero.primaryAction}
          </ButtonLink>
          {" "}
          <ButtonLink href="#roadmap">
            {homeRu.hero.secondaryAction}
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
