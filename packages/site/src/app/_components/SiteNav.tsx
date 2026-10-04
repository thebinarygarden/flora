'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@binarygarden/flora/navigation';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/form';
import { IconBGLogo, IconGithub } from '@binarygarden/flora/icons';

const LINKS = [
  { label: 'components', href: '/components' },
  { label: 'icons', href: '/icons' },
];

/**
 * The site header. On the landing page the hero carries the nav, so the bar
 * stays hidden until the hero's buttons scroll out of view, then slides in.
 */
export function SiteNav() {
  const onHome = usePathname() === '/';
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!onHome) return;
    const actions = document.querySelector('.fl-hero-actions');
    if (!actions) return;
    const observer = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    );
    observer.observe(actions);
    return () => observer.disconnect();
  }, [onHome]);

  let className = 'site-nav';
  if (onHome) className += ' is-overlay';
  if (onHome && !pastHero) className += ' is-hidden';

  return (
    <SiteHeader
      className={className}
      brand={
        <>
          <IconBGLogo size={24} />
          <span className="fl-header-brand-name">flora</span>
        </>
      }
      links={LINKS}
      actions={
        <>
          <ThemeToggleButton />
          <Button
            variant="secondary"
            size="sm"
            href="https://github.com/thebinarygarden/flora"
            iconLeft={<IconGithub size={14} />}
          >
            github
          </Button>
        </>
      }
    />
  );
}
