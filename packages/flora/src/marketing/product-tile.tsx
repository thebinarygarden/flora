import * as React from 'react';

export interface ProductTileProps {
  name: string;
  tagline?: string;
  /** oklch hue 0–360 — the product's one color. Omit it to stay monochrome. */
  hue?: number;
  /** shown in the splash when there is no video or image: short text or the product's icon */
  glyph?: React.ReactNode;
  /** a looping, muted clip; wins over `image` */
  video?: string;
  image?: string;
  /** e.g. "v1.2 · 8 contributors" */
  meta?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A card for one product. The splash is the product's hue, and on the trunk this
 * is the one place color appears.
 *
 * With a hue it sets `data-product` and `--product-hue` on itself, so any flora
 * component rendered inside it inherits that color. Without one it stays black
 * and white, like the trunk.
 *
 * ```tsx
 * <ProductTile name="pollen" tagline="a font manager for teams" hue={60}
 *   meta="v0.9 · 6 contributors" href="/pollen" />
 * ```
 */
export function ProductTile({
  name,
  tagline,
  hue,
  glyph,
  video,
  image,
  meta,
  href,
  size = 'md',
  onClick,
  className = '',
  children,
}: ProductTileProps) {
  const Tag = href ? 'a' : 'div';
  const scoped = hue !== undefined;
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={('fl-tile ' + className).trim()}
      data-size={size}
      data-product={scoped ? '' : undefined}
      style={
        scoped ? ({ '--product-hue': hue } as React.CSSProperties) : undefined
      }
    >
      <div className="fl-tile-splash">
        {video ? (
          <video src={video} autoPlay muted loop playsInline />
        ) : image ? (
          <img src={image} alt="" />
        ) : (
          <div className="fl-tile-glyph">{glyph || name}</div>
        )}
      </div>
      <div className="fl-tile-body">
        <div className="fl-tile-name">
          <span className="fl-tile-dot" aria-hidden="true" />
          {name}
        </div>
        {tagline && <div className="fl-tile-tag">{tagline}</div>}
        {meta && <div className="fl-tile-meta">{meta}</div>}
        {children}
      </div>
    </Tag>
  );
}
