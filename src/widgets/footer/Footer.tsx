import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <a href="/" className={styles.brand} aria-label="Julia AI">
            <span className={styles.brandMark} aria-hidden="true">
              <span className={styles.brandMarkInner} />
            </span>

            <span>
              <span className={styles.brandText}>Julia AI</span>
              <span className={styles.brandSub}>Research Project</span>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Footer navigation">
            <a href="#architecture" className={styles.navLink}>
              Архитектура
            </a>
            <a href="#roadmap" className={styles.navLink}>
              Roadmap
            </a>
            <a href="#launcher" className={styles.navLink}>
              Launcher
            </a>
          </nav>
        </div>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerOrn}>✦ ✦ ✦</span>
        </div>

        <p className={styles.tagline}>
          <span>Elegant intelligence</span>
          <span className={styles.taglineSep} aria-hidden="true" />
          <span>Quiet research</span>
          <span className={styles.taglineSep} aria-hidden="true" />
          <span>Julia AI</span>
        </p>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} <em>Julia AI</em>. Экспериментальный исследовательский проект.
          </p>

          <span className={styles.statusPill}>
            <span className={styles.statusDot} aria-hidden="true" />
            Active
          </span>
        </div>
      </div>
    </footer>
  );
}