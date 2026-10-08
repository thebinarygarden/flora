'use client';

import { ComponentProps, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Carousel } from '@binarygarden/flora/navigation';
import { PageHead } from '@/app/_components/Specimen';

const GROUPS = ['core', 'forms', 'navigation', 'feedback', 'marketing'];

const ITEMS = GROUPS.map((g) => ({
  value: g,
  title: g,
  href: '/components/' + g,
}));

// Next scrolls to the top on every switch; SectionCarousel places it instead
function GroupLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} scroll={false} />;
}

/**
 * The gallery's heading and its section nav. It lives in the layout, so it
 * stays put while you move between groups.
 */
export function SectionCarousel() {
  const value = usePathname().split('/')[2];
  const headRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const shown = useRef(value);

  // each group starts at its own top: if the carousel was stuck, keep it stuck
  // and show the new group from its first item; above that, leave the scroll
  useEffect(() => {
    if (shown.current === value) return;
    shown.current = value;
    const head = headRef.current;
    const nav = navRef.current;
    if (!head || !nav) return;
    const top =
      head.getBoundingClientRect().bottom +
      window.scrollY -
      parseFloat(getComputedStyle(nav).top);
    if (window.scrollY > top) window.scrollTo({ top });
  }, [value]);

  return (
    <>
      <div className="page sections" ref={headRef}>
        <PageHead eyebrow="flora" title="components.">
          flora components have no colour of their own. on BG sites, like this
          one, they&apos;re black and white. inside a product we build for
          others, they take on that product&apos;s colour. drag the hue above to
          try it.
        </PageHead>
      </div>
      {/* a sibling of the gallery, not inside the heading, so it can stick
          for the whole page */}
      <nav className="section-nav" ref={navRef}>
        <div className="section-nav-in">
          <Carousel items={ITEMS} value={value} arrows={false} linkAs={GroupLink} />
        </div>
      </nav>
    </>
  );
}
