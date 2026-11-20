import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Section.module.css";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** "evening" switches the section to the evening palette in any theme. */
  tone?: "default" | "evening";
  /** "none" — the section's own content (e.g. a tray) provides the rhythm. */
  space?: "default" | "compact" | "none";
};

export function Section({ tone = "default", space = "default", className, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      // Anchored sections can receive focus after in-page navigation.
      tabIndex={id ? -1 : undefined}
      className={cn(
        styles.section,
        space !== "default" && styles[space],
        tone === "evening" && "scope-evening",
        className,
      )}
      {...props}
    />
  );
}
