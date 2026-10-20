import * as React from 'react';

export interface ProductScopeProps {
  /**
   * The product's one color, as an oklch hue (0–360). Omit it for the trunk's
   * monochrome default, where the accent collapses to the foreground.
   */
  hue?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * A product scope. Every flora component inside takes the given hue — that is
 * the entire theme. Nothing else about the components changes.
 *
 * ```tsx
 * <ProductScope hue={330}>
 *   <Button>publish</Button>
 * </ProductScope>
 * ```
 */
export function ProductScope({
  hue,
  className,
  style,
  children,
}: ProductScopeProps) {
  const scoped = hue !== undefined;
  return (
    <div
      data-product={scoped ? '' : undefined}
      className={className}
      style={
        scoped
          ? ({ ...style, '--product-hue': hue } as React.CSSProperties)
          : style
      }
    >
      {children}
    </div>
  );
}
