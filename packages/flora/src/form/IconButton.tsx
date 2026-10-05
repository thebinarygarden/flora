import * as React from 'react';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name, also used as the native tooltip. Required. */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'filled';
  /** the icon — 18px, 1.5px stroke */
  children: React.ReactNode;
}

/**
 * Square icon-only button for toolbars, headers and card corners. Ghost by
 * default; `outline` in empty areas; `filled` for the one accent action.
 *
 * ```tsx
 * <IconButton label="search"><IconSearch size={18} /></IconButton>
 * ```
 */
export function IconButton({
  label,
  size = 'md',
  variant = 'ghost',
  children,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={('fl-ibtn ' + className).trim()}
      data-size={size}
      data-variant={variant}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  );
}
