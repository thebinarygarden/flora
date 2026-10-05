import { IconsInteractiveSection } from '@/app/icons/_components/IconsInteractiveSection';
import { PageHead } from '@/app/_components/Specimen';

export default function IconsPage() {
  return (
    <div className="page">
      <PageHead eyebrow="flora" title="icons.">
        26 bespoke marks. 1.5px stroke, currentColor, 16px inline and 18px in
        icon buttons. no icon font, no emoji.
      </PageHead>
      <IconsInteractiveSection />
    </div>
  );
}
