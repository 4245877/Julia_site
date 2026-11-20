import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./SegmentedControl.module.css";

type SegmentOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
};

type SegmentedControlProps = {
  /** Accessible name of the group. */
  label?: string;
  labelledBy?: string;
  value: string;
  options: readonly SegmentOption[];
  onChange?: (value: string) => void;
  size?: "md" | "sm";
  className?: string;
};

/** A group of toggle buttons (aria-pressed) on a soft shared track. */
export function SegmentedControl({
  label,
  labelledBy,
  value,
  options,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn(styles.group, styles[size], className)}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={styles.segment}
          aria-pressed={value === option.value}
          aria-label={option.ariaLabel}
          title={option.title}
          disabled={option.disabled}
          onClick={onChange ? () => onChange(option.value) : undefined}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
