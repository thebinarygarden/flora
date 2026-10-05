import * as React from 'react';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  size?: 'sm' | 'md';
}

/**
 * On/off toggle for settings that apply immediately — no save button.
 *
 * ```tsx
 * <Switch label="dark mode" defaultChecked />
 * ```
 */
export function Switch({
  label,
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}: SwitchProps) {
  return (
    <label
      className={('fl-switch ' + className).trim()}
      data-size={size}
      data-disabled={disabled}
    >
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="fl-track" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
}
