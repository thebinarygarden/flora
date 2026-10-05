'use client';

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

/**
 * The gallery's heading and its section nav. It lives in the layout, so it
 * stays put while you move between groups.
 */
export function SectionCarousel() {
  const value = usePathname().split('/')[2];

  return (
    <>
      <div className="page sections">
        <PageHead eyebrow="flora" title="components.">
          flora components have no colour of their own. on BG sites, like this
          one, they&apos;re black and white. inside a product we build for
          others, they take on that product&apos;s colour. drag the hue above to
          try it.
        </PageHead>
      </div>
      {/* a sibling of the gallery, not inside the heading, so it can stick
          for the whole page */}
      <nav className="section-nav">
        <div className="section-nav-in">
          <Carousel items={ITEMS} value={value} arrows={false} linkAs={Link} />
        </div>
      </nav>
    </>
  );
}
