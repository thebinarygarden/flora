import * as React from 'react';

// Anchor attributes rather than plain HTML ones so `as="a"` can take href,
// target and rel. A whole card is often the link.
export interface CardProps extends React.AnchorHTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  /** a control at the end of the title row, such as a small button */
  action?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** raised = border on the page; sunken = tinted, no border; accent = product-tinted */
  variant?: 'raised' | 'sunken' | 'accent';
  /** lifts on hover and becomes focusable; with `onClick`, Enter and Space click it */
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
  action,
  padding = 'md',
  variant = 'raised',
  interactive = false,
  as: Tag = 'div',
  children,
  className = '',
  onKeyDown,
  ...rest
}: CardProps) {
  // A focused card clicks on Enter and Space like a button. Links already do,
  // and keys pressed on a control inside the card belong to that control.
  const clicks = interactive && rest.onClick && Tag !== 'a';
  const keyDown = clicks
    ? (e: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented || e.target !== e.currentTarget) return;
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        e.currentTarget.click();
      }
    : onKeyDown;
  const heading = title && <h3 className="fl-card-title">{title}</h3>;
  return (
    <Tag
      className={('fl-card ' + className).trim()}
      data-padding={padding}
      data-variant={variant}
      data-interactive={interactive}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={keyDown}
      {...rest}
    >
      {action ? (
        <div className="fl-card-head">
          {heading}
          {action}
        </div>
      ) : (
        heading
      )}
      {description && <p className="fl-card-desc">{description}</p>}
      {children}
    </Tag>
  );
}
