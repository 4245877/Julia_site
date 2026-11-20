type ColorOption = {
  value: string;
  label: string;
};

type ColorPickerProps = {
  label: string;
  value: string;
  options: ColorOption[];
  onChange: (value: string) => void;
};

export function ColorPicker({
  label,
  value,
  options,
  onChange,
}: ColorPickerProps) {
  return (
    <label>
      {label}{" "}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
