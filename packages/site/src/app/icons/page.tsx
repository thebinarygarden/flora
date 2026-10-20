import { IconsInteractiveSection } from '@/app/icons/_components/icons-interactive-section';
import { PageHead } from '@/components/specimen';
import { SiteNav } from '@/components/site-chrome';
import { getI18n } from '@/lib/i18n';

export default async function IconsPage() {
  const { t } = await getI18n();
  return (
    <>
      <SiteNav />
      <main className="page">
        <PageHead eyebrow="flora" title={`${t.nav.icons}.`}>
          {t.icons.contents}
        </PageHead>
        <IconsInteractiveSection t={t.icons} copy={t.flora.copy} />
      </main>
    </>
  );
}
