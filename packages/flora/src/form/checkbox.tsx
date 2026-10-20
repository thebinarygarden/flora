'use client';

import * as React from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  /** for a parent row whose children are partly checked */
  indeterminate?: boolean;
}

/**
 * Accent-filled checkbox with a springy check. `indeterminate` is for parent
 * rows.
 *
 * ```tsx
 * <Checkbox label="notify on release" defaultChecked />
 * <Checkbox label="all" indeterminate />
 * ```
 */
export function Checkbox({
  label,
  description,
  indeterminate = false,
  disabled = false,
  className = '',
  ...rest
}: CheckboxProps) {
  // `indeterminate` is a DOM property with no HTML attribute, so it has to be
  // set imperatively.
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={('fl-check ' + className).trim()}
      data-disabled={disabled}
      style={{ alignItems: description ? 'flex-start' : 'center' }}
    >
      <input ref={ref} type="checkbox" disabled={disabled} {...rest} />
      <span className="fl-box" aria-hidden="true" />
      {label && (
        <span>
          {label}
          {description && <span className="fl-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
