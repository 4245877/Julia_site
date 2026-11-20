import { homeRu } from "@/content/home.ru";
import { sectionNumber } from "@/shared/config/navigation";
import { Container } from "@/shared/ui/Container";
import { Icon, type IconName } from "@/shared/ui/Icon";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import styles from "./FeaturesSection.module.css";

const featureIcons: readonly IconName[] = ["perception", "sprout", "persona"];

export function FeaturesSection() {
  return (
    <Section id="features" aria-labelledby="features-title">
      <Container>
        <SectionHeading
          index={sectionNumber("features")}
          eyebrow="Julia AI"
          eyebrowLang="en"
          titleId="features-title"
          title={
            <>
              Ключевые возможности <em>Julia</em>
            </>
          }
          lead="Инструменты, которые помогают мыслить яснее, работать быстрее и аккуратно выстраивать архитектуру решений."
        />

        <ol className={styles.list}>
          {homeRu.featureCards.map((card, index) => (
            <li key={card.title} className={styles.item} data-reveal>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.heading}>
                <Icon name={featureIcons[index]} size={22} className={styles.icon} />
                <h3 className={styles.title}>{card.title}</h3>
              </div>
              <p className={styles.text}>{card.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
