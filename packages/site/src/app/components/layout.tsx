import { ReactNode } from 'react';
import { HueScope } from './_components/HueScope';
import { SectionCarousel } from './_components/SectionCarousel';
import { getI18n } from '@/lib/i18n';

export default async function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = await getI18n();
  return (
    <HueScope t={t.gallery} head={<SectionCarousel t={t.gallery} />}>
      {children}
    </HueScope>
  );
}
