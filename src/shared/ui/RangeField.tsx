import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./RangeField.module.css";

type RangeFieldProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
  className?: string;
};

export function RangeField({
  id,
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit,
  minLabel,
  maxLabel,
  onChange,
  className,
}: RangeFieldProps) {
  const valueText = unit ? `${value} ${unit}` : String(value);
  const fill = ((value - min) / (max - min)) * 100;
  const scaleId = minLabel || maxLabel ? `${id}-scale` : undefined;

  return (
    <div className={cn(styles.field, className)}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <output htmlFor={id} className={styles.value}>
          {valueText}
        </output>
      </div>

      <input
        id={id}
        className={styles.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        aria-describedby={scaleId}
        style={{ "--fill": `${fill}%` } as CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />

      {scaleId && (
        <p id={scaleId} className={styles.scale}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </p>
      )}
    </div>
  );
}
