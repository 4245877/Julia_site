type RangeFieldProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
};

export function RangeField({
  id,
  label,
  value,
  min = 0,
  max = 100,
  unit,
  minLabel,
  maxLabel,
  onChange,
}: RangeFieldProps) {
  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}
        </label>
        <output htmlFor={id}>
          {value}
          {unit ? ` ${unit}` : ""}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />

      {(minLabel || maxLabel) && (
        <div>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}