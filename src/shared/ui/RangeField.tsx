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
    <div className="form-group">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="font-medium text-slate-100">
          {label}
        </label>
        <output htmlFor={id} className="font-semibold text-white">
          {value}
          {unit ? ` ${unit}` : ""}
        </output>
      </div>

      <input
        id={id}
        className="range-input"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />

      {(minLabel || maxLabel) && (
        <div className="range-labels">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}