import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Card.module.css";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li" | "section" | "aside";
  /** surface — porcelain on paper; outline — line only; sunken — pressed into the page. */
  variant?: "surface" | "outline" | "sunken";
  /** Ambient afterglow on hover (for non-interactive cards: no lift, only warmth). */
  glow?: boolean;
};

export function Card({ as: Tag = "div", variant = "surface", glow = false, className, ...props }: CardProps) {
  return <Tag className={cn(styles.card, styles[variant], glow && styles.glow, className)} {...props} />;
}
