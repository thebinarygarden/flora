import * as React from 'react';

// Anchor attributes rather than plain HTML ones so `as="a"` can take href,
// target and rel. A whole card is often the link.
export interface CardProps extends React.AnchorHTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** raised = border on the page; sunken = tinted, no border; accent = product-tinted */
  variant?: 'raised' | 'sunken' | 'accent';
  /** lifts on hover and becomes focusable */
  interactive?: boolean;
  as?: React.ElementType;
}

/**
 * Bordered content surface. Resting cards never have shadows — they have
 * borders. Interactive ones lift on hover.
 *
 * ```tsx
 * <Card title="flora" description="react components for the garden" />
 * <Card variant="sunken" padding="sm">…</Card>
 * ```
 */
export function Card({
  title,
  description,
  padding = 'md',
  variant = 'raised',
  interactive = false,
  as: Tag = 'div',
  children,
  className = '',
  ...rest
}: CardProps) {
  return (
    <Tag
      className={('fl-card ' + className).trim()}
      data-padding={padding}
      data-variant={variant}
      data-interactive={interactive}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      {title && <h3 className="fl-card-title">{title}</h3>}
      {description && <p className="fl-card-desc">{description}</p>}
      {children}
    </Tag>
  );
}
