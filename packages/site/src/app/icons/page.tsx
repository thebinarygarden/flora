import { IconsInteractiveSection } from '@/app/icons/_components/IconsInteractiveSection';
import { PageHead } from '@/app/_components/Specimen';
import { getI18n } from '@/lib/i18n';

export default async function IconsPage() {
  const { t } = await getI18n();
  return (
    <div className="page">
      <PageHead eyebrow="flora" title={`${t.nav.icons}.`}>
        {t.icons.contents}
      </PageHead>
      <IconsInteractiveSection t={t.icons} copy={t.flora.copy} />
    </div>
  );
}
