'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from '@binarygarden/flora/navigation';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/form';
import { IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import type { Dict } from '@/lib/i18n';

/**
 * The site header. On the landing page the hero carries the nav, so the bar
 * stays hidden until the hero's buttons scroll out of view, then slides in.
 */
export function SiteNav({
  t,
  localeToggle,
}: {
  t: Pick<Dict, 'nav' | 'flora'>;
  /** a server component, so it comes in already rendered */
  localeToggle: React.ReactNode;
}) {
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
      links={[
        { label: t.nav.components, href: '/components' },
        { label: t.nav.icons, href: '/icons' },
      ]}
      labels={t.flora.header}
      actions={
        <>
          {localeToggle}
          <ThemeToggleButton labels={t.flora.theme} />
          <Button
            variant="secondary"
            size="sm"
            href="https://github.com/thebinarygarden/flora"
            iconLeft={<IconGithub size={14} />}
          >
            {t.nav.github}
          </Button>
        </>
      }
    />
  );
}
