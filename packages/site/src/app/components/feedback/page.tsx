import { Dialog, Toast, ToastStack } from '@binarygarden/flora/overlay';
import { Button } from '@binarygarden/flora/form';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';
import { FeedbackDemos } from './_components/FeedbackDemos';
import { getI18n } from '@/lib/i18n';

export default async function FeedbackPage() {
  const { t } = await getI18n();
  const f = t.feedback;
  return (
    <div className="page">
      <PageHead
        eyebrow={t.nav.components}
        title={`${t.gallery.groups.feedback}.`}
      >
        {f.contents}
      </PageHead>

      <Section title={f.dialog}>
        <Specimen label={f.inline} note={f.dialogNote} block>
          <Dialog
            inline
            title={f.deleteRepo}
            description={f.undone}
            footer={
              <>
                <Button variant="ghost">{f.cancel}</Button>
                <Button variant="danger">{f.delete}</Button>
              </>
            }
          />
        </Specimen>
      </Section>

      <Section title={f.toast}>
        <Specimen label={f.tones} note={f.toastNote} block>
          <ToastStack inline>
            <Toast message={f.published} description={f.ago} />
            <Toast tone="ok" message={f.passed} action={f.view} />
            <Toast tone="danger" message={f.failed} action={f.retry} />
            <Toast tone="accent" message={f.newVersion} action={f.reload} />
          </ToastStack>
        </Specimen>
      </Section>

      <Section title={f.practice}>
        <Specimen label={f.practiceLabel} note={f.practiceNote}>
          <FeedbackDemos t={f} labels={t.flora.toast} />
        </Specimen>
      </Section>
    </div>
  );
}
