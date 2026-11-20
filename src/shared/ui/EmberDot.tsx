import { cn } from "@/shared/lib/cn";
import styles from "./EmberDot.module.css";

type EmberDotProps = {
  /** Slowly brightens and dims, like a small ember. */
  live?: boolean;
  className?: string;
};

/** A tiny ochre point of warmth — the signature accent, used sparingly. */
export function EmberDot({ live = false, className }: EmberDotProps) {
  return <span className={cn(styles.ember, live && styles.live, className)} aria-hidden="true" />;
}
