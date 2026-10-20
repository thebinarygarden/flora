import { ReactNode } from 'react';
import { HueScope } from './_components/hue-scope';
import { SectionCarousel } from './_components/section-carousel';
import { SiteNav } from '@/components/site-chrome';
import { getI18n } from '@/lib/i18n';

export default async function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = await getI18n();
  return (
    <>
      <SiteNav />
      <main>
        <HueScope t={t.gallery} head={<SectionCarousel t={t.gallery} />}>
          {children}
        </HueScope>
      </main>
    </>
  );
}
