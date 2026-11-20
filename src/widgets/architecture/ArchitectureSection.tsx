import { homeRu } from "@/content/home.ru";
import { sectionNumber } from "@/shared/config/navigation";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Icon, type IconName } from "@/shared/ui/Icon";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import styles from "./ArchitectureSection.module.css";

const cardIcons: readonly IconName[] = ["core", "memory", "chip"];

export function ArchitectureSection() {
  return (
    <Section id="architecture" aria-labelledby="architecture-title">
      <Container>
        <SectionHeading
          index={sectionNumber("architecture")}
          eyebrow="Architecture"
          eyebrowLang="en"
          titleId="architecture-title"
          title={
            <>
              Не чат-бот. Не оболочка. <em>Когнитивная система.</em>
            </>
          }
          lead="Julia проектируется как многоуровневая архитектура, где отдельные модули отвечают за восприятие, память, внимание, внутреннее состояние, принятие решений и обучение на опыте. Главная цель — создать не набор скриптов, а устойчивую систему с долговременным контекстом и адаптивным поведением."
        />

        <ul className={styles.grid}>
          {homeRu.architectureCards.map((card, index) => (
            <Card as="li" key={card.title} glow className={styles.card} data-reveal>
              <span className={styles.icon}>
                <Icon name={cardIcons[index]} size={24} />
              </span>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.text}>{card.description}</p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
