import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  /** Two-digit chapter number shown before the eyebrow, e.g. "03". */
  index?: string;
  eyebrow?: ReactNode;
  /** Language of the eyebrow text when it differs from the page (e.g. "en"). */
  eyebrowLang?: string;
  title: ReactNode;
  titleId?: string;
  as?: "h1" | "h2";
  lead?: ReactNode;
  layout?: "split" | "stack";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  eyebrowLang,
  title,
  titleId,
  as: Heading = "h2",
  lead,
  layout = "split",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(styles.heading, styles[layout], className)}>
      <div className={styles.titleGroup}>
        {(index || eyebrow) && (
          <p className={styles.eyebrow}>
            {index && <span className={styles.index}>{index}</span>}
            {index && eyebrow && <span className={styles.rule} aria-hidden="true" />}
            {eyebrow && <span lang={eyebrowLang}>{eyebrow}</span>}
          </p>
        )}
        <Heading id={titleId} className={styles.title}>
          {title}
        </Heading>
      </div>

      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
