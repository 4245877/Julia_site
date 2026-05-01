import { homeRu } from "@/content/home.ru";

import styles from "./BrainModelSection.module.css";

export function BrainModelSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>Architecture</div>

          <h2 className={styles.heading}>
            Модель мозга в <em>программной архитектуре</em>
          </h2>

          <p className={styles.subtitle}>
            Архитектура мышления как система: точная, живая и способная
            развиваться вместе с продуктом.
          </p>
        </header>

        <div className={styles.ornamentDivider} aria-hidden="true">
          <span className={styles.ornamentGlyph}>◆</span>
        </div>

        <div className={styles.grid}>
          {homeRu.brainModelCards.map((card, index) => (
            <article key={card.title} className={styles.card}>
              <span className={styles.cardNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className={styles.cardIcon} aria-hidden="true">
                ✦
              </div>

              <h3 className={styles.cardTitle}>{card.title}</h3>

              <p className={styles.cardDesc}>{card.description}</p>

              <span className={styles.cardTag}>Brain model</span>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#contact" className={styles.ctaBtn}>
            Обсудить архитектуру
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}