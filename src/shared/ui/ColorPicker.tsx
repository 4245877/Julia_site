import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./ColorPicker.module.css";

type ColorOption = {
  value: string;
  label: string;
  /** Display colour of the swatch. */
  swatch: string;
};

type ColorPickerProps = {
  name: string;
  label: string;
  value: string;
  options: readonly ColorOption[];
  onChange: (value: string) => void;
  className?: string;
};

/** Colour choice as a radio group of swatches (arrow keys move between them). */
export function ColorPicker({ name, label, value, options, onChange, className }: ColorPickerProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <fieldset className={cn(styles.fieldset, className)}>
      <legend className={styles.legend}>{label}</legend>
      <span className={styles.current} aria-hidden="true">
        {selected?.label}
      </span>

      <div className={styles.swatches}>
        {options.map((option) => (
          <label key={option.value} className={styles.option} title={option.label}>
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span
              className={styles.swatch}
              style={{ "--swatch": option.swatch } as CSSProperties}
              aria-hidden="true"
            />
            <span className="visually-hidden">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
