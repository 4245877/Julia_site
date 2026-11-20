import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { EmberDot } from "./EmberDot";
import styles from "./Tag.module.css";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "sage" | "mauve";
  /** Leading ember; "live" makes it breathe (for active states). */
  dot?: "static" | "live";
};

export function Tag({ tone = "neutral", dot, className, children, ...props }: TagProps) {
  return (
    <span className={cn(styles.tag, styles[tone], className)} {...props}>
      {dot && <EmberDot live={dot === "live"} />}
      {children}
    </span>
  );
}
