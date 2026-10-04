import { Dialog, Toast, ToastStack } from '@binarygarden/flora/overlay';
import { Button } from '@binarygarden/flora/form';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';
import { FeedbackDemos } from './_components/FeedbackDemos';

export default function FeedbackPage() {
  return (
    <div className="page">
      <PageHead eyebrow="components" title="feedback.">
        dialog · toast
      </PageHead>

      <Section title="dialog">
        <Specimen
          label="inline, for docs"
          note="one decision per dialog. it scales up slightly as it opens, over a blurred page."
          block
        >
          <Dialog
            inline
            title="delete repo?"
            description="this can't be undone."
            footer={
              <>
                <Button variant="ghost">cancel</Button>
                <Button variant="danger">delete</Button>
              </>
            }
          />
        </Specimen>
      </Section>

      <Section title="toast">
        <Specimen
          label="tones"
          note="appears bottom-right and rises in. the dot shows the status; the accent toast takes on the product's colour."
          block
        >
          <ToastStack inline>
            <Toast message="published" description="2s ago" />
            <Toast tone="ok" message="build passed" action="view" />
            <Toast tone="danger" message="deploy failed" action="retry" />
            <Toast
              tone="accent"
              message="new version available"
              action="reload"
            />
          </ToastStack>
        </Specimen>
      </Section>

      <Section title="in practice">
        <Specimen
          label="the real thing"
          note="a real modal, a toast that disappears on its own, and confirm/prompt/alert dialogs you can open from code."
        >
          <FeedbackDemos />
        </Specimen>
      </Section>
    </div>
  );
}
