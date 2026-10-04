import * as React from 'react';

export interface HeroProps {
  /** small label with a leading accent dot */
  eyebrow?: React.ReactNode;
  /** replaces the eyebrow's accent dot, e.g. a logo */
  eyebrowMark?: React.ReactNode;
  /** wrap one phrase in `<em>` to tint it with the accent */
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Page opener: eyebrow, display headline, one paragraph, one or two buttons,
 * optional media. The parts stagger in by 60ms.
 *
 * Headlines are at most 8 words, one idea, and end with a period.
 *
 * ```tsx
 * <Hero
 *   eyebrow="binary garden"
 *   title={<>open source, <em>for humans.</em></>}
 *   subtitle="…"
 *   actions={<Button size="lg">explore the garden</Button>}
 * />
 * ```
 */
export function Hero({
  eyebrow,
  eyebrowMark,
  title,
  subtitle,
  actions,
  media,
  align = 'left',
  className = '',
}: HeroProps) {
  return (
    <section className={('fl-hero ' + className).trim()} data-align={align}>
      {eyebrow && (
        <div
          className="fl-hero-eyebrow"
          data-mark={eyebrowMark ? '' : undefined}
        >
          {eyebrowMark}
          {eyebrow}
        </div>
      )}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {actions && <div className="fl-hero-actions">{actions}</div>}
      {media && <div className="fl-hero-media">{media}</div>}
    </section>
  );
}
