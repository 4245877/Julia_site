"use client";

import { useId } from "react";
import { cn } from "@/shared/lib/cn";
import { useTheme } from "../model/useTheme";
import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  /** "icon" — round icon button; "row" — labelled row for menus. */
  variant?: "icon" | "row";
  className?: string;
};

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const maskId = useId();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={cn(styles.toggle, styles[variant], className)}
      aria-pressed={isDark}
      aria-label={variant === "icon" ? "Тёмная тема" : undefined}
      title={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* The icon state is driven by CSS from <html data-theme>, so it is
          correct from the first paint, before hydration. */}
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <mask id={maskId}>
          <rect width="24" height="24" fill="#fff" />
          <circle className={styles.shade} cx="20" cy="4" r="6.5" fill="#000" />
        </mask>
        <circle className={styles.core} cx="12" cy="12" r="4.6" fill="currentColor" mask={`url(#${maskId})`} />
        <g className={styles.rays} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 2.5v1.8M12 19.7v1.8M21.5 12h-1.8M4.3 12H2.5M18.7 5.3l-1.3 1.3M6.6 17.4l-1.3 1.3M18.7 18.7l-1.3-1.3M6.6 6.6 5.3 5.3" />
        </g>
      </svg>

      {variant === "row" && (
        <>
          <span className={styles.label}>Тёмная тема</span>
          <span className={styles.switch} aria-hidden="true">
            <span className={styles.knob} />
          </span>
        </>
      )}
    </button>
  );
}
