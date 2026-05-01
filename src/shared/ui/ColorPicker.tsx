import { cn } from "@/shared/lib/cn";

type ColorOption = {
  value: string;
  hex: string;
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
    <div className="form-group">
      <p className="font-medium text-slate-100">{label}</p>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={cn(
              "color-option",
              value === option.value && "color-option-active",
            )}
            style={{ backgroundColor: option.hex }}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}