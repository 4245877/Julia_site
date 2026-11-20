import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Footer } from "@/widgets/footer/Footer";
import { QuietPool } from "@/widgets/hero/QuietPool";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <main id="main" tabIndex={-1} className={styles.main}>
        <Container size="narrow" className={styles.inner}>
          <QuietPool className={styles.pool} labels={false} idPrefix="lost" />

          <p className={styles.code}>Ошибка 404</p>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.text}>
            Похоже, она вышла подышать свежим воздухом и не спешит возвращаться. Давайте вернёмся
            туда, где тепло.
          </p>

          <ButtonLink href="/" icon="arrow-left" iconPosition="start">
            Вернуться на главную
          </ButtonLink>
        </Container>
      </main>
      <Footer />
    </>
  );
}
