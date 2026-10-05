import * as React from 'react';

export type RadioOption =
  | string
  | { value: string; label: string; disabled?: boolean };

export interface RadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** lay the options out in a row */
  row?: boolean;
  className?: string;
}

/**
 * Radio group for 2–5 mutually exclusive options, vertical by default.
 *
 * ```tsx
 * <Radio name="license" options={['mit', 'apache-2.0']} defaultValue="mit" />
 * ```
 */
export function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  row = false,
  className = '',
}: RadioProps) {
  const controlled = value !== undefined;
  return (
    <div
      role="radiogroup"
      className={('fl-radiogroup ' + className).trim()}
      data-row={row}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return (
          <label
            key={opt.value}
            className="fl-radio"
            data-disabled={!!opt.disabled}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              disabled={opt.disabled}
              {...(controlled
                ? { checked: value === opt.value }
                : { defaultChecked: defaultValue === opt.value })}
              // Only attach a handler when one was given, so an uncontrolled
              // group still renders from a server component.
              {...(onChange ? { onChange: () => onChange(opt.value) } : {})}
            />
            <span className="fl-dot" aria-hidden="true" />
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
