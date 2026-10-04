'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { IconArrow } from '../icons/IconArrow';

export interface CarouselItem {
  value: string;
  title: string;
  /** renders the item as a link (through `linkAs`) instead of a button */
  href?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /**
   * true: the current item centred, its neighbours small and faded either
   * side, with arrows that wrap at the ends. false: every item as a pill.
   */
  arrows?: boolean;
  /** the link element for items with an href, e.g. next/link */
  linkAs?: React.ElementType;
  className?: string;
}

// Lets the browser slide and scale each word to its new place; browsers
// without the View Transitions API (and reduced motion, where the duration
// tokens are 0) just switch.
function transition(update: () => void) {
  if (typeof document.startViewTransition !== 'function') {
    update();
    return;
  }
  // A skipped transition (hidden tab, a click mid-slide) rejects `ready`; the
  // update still runs, so there is nothing to handle.
  document.startViewTransition(() => flushSync(update)).ready.catch(() => {});
}

/**
 * Section nav. With `arrows` it shows one item at a time between its
 * neighbours; without, a strip of pills. Items with an `href` are links.
 *
 * ```tsx
 * <Carousel
 *   linkAs={Link}
 *   value="forms"
 *   items={[{ value: 'core', title: 'core', href: '/components/core' }]}
 * />
 * ```
 */
export function Carousel({
  items = [],
  value,
  defaultValue,
  onChange,
  arrows = true,
  linkAs = 'a',
  className = '',
}: CarouselProps) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const selected = value !== undefined ? value : inner;
  // What the arrows strip shows. It follows the selection inside a view
  // transition, and only once the selection has changed: when a router drives
  // `value`, that is after the new page has rendered and scrolled, so nothing
  // but the words moves between the two snapshots.
  const [shown, setShown] = React.useState(selected);
  const cur = arrows ? shown : selected;
  const name = 'fl-carousel-' + React.useId().replace(/[^a-zA-Z0-9]/g, '');

  React.useEffect(() => {
    if (arrows && selected !== shown) transition(() => setShown(selected));
  }, [arrows, selected, shown]);

  const set = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };
  const trackRef = React.useRef<HTMLDivElement>(null);

  const n = items.length;
  const found = items.findIndex((i) => i.value === cur);
  // with arrows something is always centred; the pills can show none
  const at = arrows ? Math.max(found, 0) : found;
  const prev = items[at < 0 ? n - 1 : (at - 1 + n) % n];
  const next = items[(at + 1) % n];

  // keep the selected pill centred in the strip
  React.useEffect(() => {
    const track = trackRef.current;
    const el = track?.querySelector<HTMLElement>('[aria-current]');
    if (!track || !el) return;
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2,
      behavior: 'smooth',
    });
  }, [cur, arrows]);

  if (n === 0) return null;

  const item = (
    it: CarouselItem,
    className: string,
    {
      children,
      ...rest
    }: Record<string, unknown> & {
      children?: React.ReactNode;
    } = {}
  ) => {
    const El = it.href ? linkAs : 'button';
    return (
      <El
        className={className}
        href={it.href}
        type={it.href ? undefined : 'button'}
        onClick={() => set(it.value)}
        {...rest}
      >
        {children ?? it.title}
      </El>
    );
  };
  const currentAttr = (it: CarouselItem) => (it.href ? 'page' : 'true');

  if (!arrows) {
    return (
      <div className={('fl-carousel ' + className).trim()}>
        <div className="fl-carousel-track" ref={trackRef}>
          {items.map((it) => (
            <React.Fragment key={it.value}>
              {item(it, 'fl-carousel-pill', {
                'aria-current': it.value === cur ? currentAttr(it) : undefined,
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  const current = items[at];
  // the same name before and after is what makes a word travel
  const slide = (it: CarouselItem) =>
    ({
      viewTransitionName: `${name}-${it.value}`,
      viewTransitionClass: 'fl-carousel',
    }) as React.CSSProperties;
  const arrow = (it: CarouselItem, dir: 'left' | 'right') =>
    item(it, 'fl-ibtn', {
      'data-size': 'sm',
      'data-variant': 'outline',
      'aria-label': dir === 'left' ? 'previous' : 'next',
      title: it.title,
      children: <IconArrow orientation={dir} size={14} />,
    });

  return (
    <div className={('fl-carousel ' + className).trim()} data-arrows="true">
      {n > 1 && arrow(prev, 'left')}
      <div className="fl-carousel-stage">
        {/* with two items the neighbour on each side is the same one */}
        {n > 2 && (
          <React.Fragment key={'p-' + prev.value}>
            {item(prev, 'fl-carousel-side', {
              'data-side': 'prev',
              tabIndex: -1,
              style: slide(prev),
            })}
          </React.Fragment>
        )}
        <React.Fragment key={'c-' + current.value}>
          {item(current, 'fl-carousel-current', {
            'aria-current': currentAttr(current),
            style: slide(current),
          })}
        </React.Fragment>
        {n > 1 && (
          <React.Fragment key={'n-' + next.value}>
            {item(next, 'fl-carousel-side', {
              'data-side': 'next',
              tabIndex: -1,
              style: slide(next),
            })}
          </React.Fragment>
        )}
      </div>
      {n > 1 && arrow(next, 'right')}
    </div>
  );
}
