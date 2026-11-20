import { homeRu } from "@/content/home.ru";
import { sectionNumber } from "@/shared/config/navigation";
import { siteConfig } from "@/shared/config/site.config";
import { ButtonLink } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Icon, type IconName } from "@/shared/ui/Icon";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import styles from "./BrainModelSection.module.css";

const cardMarks: readonly { numeral: string; icon: IconName }[] = [
  { numeral: "i", icon: "cortex" },
  { numeral: "ii", icon: "episode" },
  { numeral: "iii", icon: "hub" },
  { numeral: "iv", icon: "fork" },
  { numeral: "v", icon: "refine" },
  { numeral: "vi", icon: "steps" },
];

export function BrainModelSection() {
  return (
    <Section id="brain-model" aria-labelledby="brain-model-title" space="none">
      <div className={styles.tray}>
        <Container>
          <SectionHeading
            index={sectionNumber("brain-model")}
            eyebrow="Brain model"
            eyebrowLang="en"
            titleId="brain-model-title"
            title={
              <>
                Модель мозга в <em>программной архитектуре</em>
              </>
            }
            lead="Архитектура мышления как система: точная, живая и способная развиваться вместе с продуктом."
          />

          <ul className={styles.grid}>
            {homeRu.brainModelCards.map((card, index) => (
              <Card as="li" key={card.title} variant="sunken" glow className={styles.card} data-reveal>
                <div className={styles.cardTop}>
                  <span className={styles.numeral} aria-hidden="true">
                    {cardMarks[index].numeral}.
                  </span>
                  <Icon name={cardMarks[index].icon} size={22} className={styles.icon} />
                </div>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.description}</p>
              </Card>
            ))}
          </ul>

          <div className={styles.footer}>
            <p className={styles.footerNote}>Есть мысли об устройстве когнитивного ядра?</p>
            <ButtonLink href={siteConfig.discussionsUrl} variant="secondary" icon="arrow-up-right">
              Обсудить архитектуру
            </ButtonLink>
          </div>
        </Container>
      </div>
    </Section>
  );
}
