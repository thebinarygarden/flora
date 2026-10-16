'use client';

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

  return (
    <SiteHeader
      revealAfter={onHome ? '.fl-hero-actions' : undefined}
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
