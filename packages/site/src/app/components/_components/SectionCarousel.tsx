'use client';

import { ComponentProps, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Carousel } from '@binarygarden/flora/navigation';
import { PageHead } from '@/app/_components/Specimen';
import type { Dict } from '@/lib/i18n';

const GROUPS = [
  'core',
  'forms',
  'navigation',
  'feedback',
  'marketing',
] as const;

// Next scrolls to the top on every switch; SectionCarousel places it instead
function GroupLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} scroll={false} />;
}

/**
 * The gallery's heading and its section nav. It lives in the layout, so it
 * stays put while you move between groups.
 */
export function SectionCarousel({ t }: { t: Dict['gallery'] }) {
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
        <PageHead eyebrow="flora" title={t.title}>
          {t.intro}
        </PageHead>
      </div>
      {/* a sibling of the gallery, not inside the heading, so it can stick
          for the whole page */}
      <nav className="section-nav" ref={navRef}>
        <div className="section-nav-in">
          <Carousel
            items={GROUPS.map((g) => ({
              value: g,
              title: t.groups[g],
              href: '/components/' + g,
            }))}
            value={value}
            arrows={false}
            linkAs={GroupLink}
          />
        </div>
      </nav>
    </>
  );
}
