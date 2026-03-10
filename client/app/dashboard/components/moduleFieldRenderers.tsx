export interface SelectOption {
  value: string;
  label?: string;
}

interface ModuleFieldProps<T extends object> {
  label: keyof T & string;
  value: string;
  disabled: boolean;
  isLong?: boolean;
  options?: SelectOption[];
  onChange: (label: keyof T & string, value: string) => void;
}

const CONTROL_CLASS = 'w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2';
const LONG_CLASS = 'min-h-20';

export function ModuleField<T extends object>({
  label,
  value,
  disabled,
  isLong = false,
  options,
  onChange,
}: ModuleFieldProps<T>) {
  const layoutClass = isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4';

  return (
    <label className={`space-y-1 text-sm ${layoutClass}`}>
      <span className='text-muted'>{label}</span>
      {options ? (
        <select
          className={CONTROL_CLASS}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(label, event.target.value)}
        >
          {options.map((option) => (
            <option key={`${label}-${option.value}`} value={option.value}>
              {option.label ?? option.value}
            </option>
          ))}
        </select>
      ) : isLong ? (
        <textarea
          className={`${LONG_CLASS} ${CONTROL_CLASS}`}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(label, event.target.value)}
        />
      ) : (
        <input
          className={CONTROL_CLASS}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(label, event.target.value)}
        />
      )}
    </label>
  );
}
