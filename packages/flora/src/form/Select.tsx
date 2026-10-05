import * as React from 'react';

export type SelectOption =
  | string
  | { value: string; label: string; disabled?: boolean };

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  size?: 'sm' | 'md';
}

/**
 * Native select with flora chrome. Use it for 4+ options; Tabs or Tags read
 * better for fewer.
 *
 * ```tsx
 * <Select label="theme" options={['system', 'light', 'dark']} />
 * ```
 */
export function Select({
  label,
  options = [],
  size = 'md',
  className = '',
  ...rest
}: SelectProps) {
  return (
    <label className={('fl-selwrap ' + className).trim()}>
      {label && <span className="fl-label">{label}</span>}
      <span className="fl-selbox">
        <select className="fl-select" data-size={size} {...rest}>
          {options.map((o) =>
            typeof o === 'string' ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            )
          )}
        </select>
      </span>
    </label>
  );
}
