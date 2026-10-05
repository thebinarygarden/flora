import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'solid' | 'ok' | 'warn' | 'danger';
  /** leading status dot */
  dot?: boolean;
  children: React.ReactNode;
}

/**
 * Small status label: a version, a state, a count. Not clickable — use Tag for
 * that.
 *
 * ```tsx
 * <Badge>v0.4.1</Badge>
 * <Badge tone="ok" dot>stable</Badge>
 * ```
 */
export function Badge({
  tone = 'neutral',
  dot = false,
  children,
  className = '',
  ...rest
}: BadgeProps) {
  return (
    <span
      className={('fl-badge ' + className).trim()}
      data-tone={tone}
      {...rest}
    >
      {dot && <span className="fl-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
