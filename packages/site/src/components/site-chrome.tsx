import { SiteHeader } from '@binarygarden/flora/navigation';
import { BGFooter } from '@binarygarden/flora/bg';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { IconBGLogo } from '@binarygarden/flora/icons';
import { LocaleToggle } from '@/components/locale-toggle';
import { getI18n } from '@/lib/i18n';

const footerLinks = [
  { label: 'npm', href: 'https://www.npmjs.com/package/@binarygarden/flora' },
  { label: 'github', href: 'https://github.com/thebinarygarden/flora' },
  { label: 'trunk', href: 'https://binarygarden.com' },
];

/** The small controls: in the header, and in the landing's corner. */
export async function SiteActions() {
  const { t } = await getI18n();
  return (
    <>
      <LocaleToggle />
      <ThemeToggleButton labels={t.flora.theme} />
    </>
  );
}

/**
 * The site header, rendered by each page rather than the layout, so the page
 * that opens on a landing can say so: there the hero carries the nav, and the
 * bar stays hidden until it has scrolled away.
 */
export async function SiteNav({ overLanding }: { overLanding?: boolean }) {
  const { t } = await getI18n();
  return (
    <SiteHeader
      overLanding={overLanding}
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
      actions={<SiteActions />}
    />
  );
}

export async function SiteFoot() {
  const { t } = await getI18n();
  return (
    <BGFooter
      brand={<IconBGLogo size={28} />}
      links={footerLinks}
      legal={t.nav.legal}
    />
  );
}
