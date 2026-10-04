import * as React from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** lowercase, above the field */
  label?: string;
  /** below the field */
  hint?: string;
  /** replaces the hint and turns the border --danger */
  error?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Text field with a lowercase label above and hint or error below. The focus
 * ring uses the accent.
 *
 * ```tsx
 * <Input label="email" placeholder="you@garden.dev" hint="we never share it" />
 * <Input label="handle" error="already taken" />
 * ```
 */
export function Input({
  label,
  hint,
  error,
  icon,
  size = 'md',
  className = '',
  ...rest
}: InputProps) {
  return (
    <label className={('fl-field ' + className).trim()}>
      {label && <span className="fl-label">{label}</span>}
      <span className="fl-inputwrap" data-icon={!!icon}>
        {icon}
        <input
          className="fl-input"
          data-size={size}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
      </span>
      {(error || hint) && (
        <span className="fl-hint" data-error={!!error}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
