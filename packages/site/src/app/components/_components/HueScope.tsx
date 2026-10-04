'use client';

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { ProductScope } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/form';

/**
 * Wraps the whole component gallery in a product scope, so you can drag one
 * slider and see every component in any product's color. `hue === null` is the
 * trunk's monochrome default.
 *
 * A native range input on purpose — flora has no Slider, because one hue is
 * the whole theme and a design system does not need a general-purpose slider
 * to express that.
 */
export function HueScope({
  head,
  children,
}: {
  /** between the bar and the scope, so it keeps the site's own colour */
  head?: ReactNode;
  children: ReactNode;
}) {
  const [hue, setHue] = useState<number | null>(null);
  // the bar wraps on narrow screens; anything sticky below it needs its height
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setBarHeight(bar.offsetHeight);
    // now, not only on the observer's first callback, so the first paint has it
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ '--huebar-h': `${barHeight}px` } as CSSProperties}>
      <div className="huebar" ref={barRef}>
        <span className="readout">
          {hue === null ? 'monochrome' : `hue ${hue}`}
        </span>
        <input
          type="range"
          min={0}
          max={360}
          value={hue ?? 0}
          aria-label="product hue"
          onChange={(e) => setHue(Number(e.target.value))}
        />
        <Button
          size="sm"
          variant={hue === null ? 'primary' : 'secondary'}
          onClick={() => setHue(hue === null ? 330 : null)}
        >
          {hue === null ? 'add a hue' : 'back to monochrome'}
        </Button>
      </div>
      {head}
      <ProductScope hue={hue ?? undefined}>{children}</ProductScope>
    </div>
  );
}
