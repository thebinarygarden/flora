import * as React from 'react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** primary = accent fill (black on the trunk, the product hue inside a product) */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** swaps the left icon for a spinner and blocks interaction */
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** renders an `<a>` instead of a `<button>`, styled identically */
  href?: string;
  children?: React.ReactNode;
}

/**
 * The primary action control. One primary per view, secondary for the rest,
 * ghost inside dense UI, danger only for destructive confirms. Labels are
 * lowercase and short — 1–3 words, a verb.
 *
 * ```tsx
 * <Button>publish</Button>
 * <Button variant="secondary" size="sm" iconLeft={<IconGithub size={14} />}>
 *   view source
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  href,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const inert = disabled || loading;
  const shared = {
    className: ('fl-btn ' + className).trim(),
    'data-variant': variant,
    'data-size': size,
    'aria-disabled': inert || undefined,
  };
  const body = (
    <>
      {loading ? <span className="fl-spin" aria-hidden="true" /> : iconLeft}
      {children && <span>{children}</span>}
      {iconRight}
    </>
  );

  if (href) {
    return (
      <a
        {...shared}
        href={inert ? undefined : href}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {body}
      </a>
    );
  }

  return (
    <button {...shared} disabled={inert} {...rest}>
      {body}
    </button>
  );
}
