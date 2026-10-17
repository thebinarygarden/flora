'use client';

import { useState } from 'react';
import {
  Dialog,
  Toast,
  ToastStack,
  useDialog,
} from '@binarygarden/flora/overlay';
import { Button } from '@binarygarden/flora/form';
import { Input } from '@binarygarden/flora/form';
import { format } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

export function FeedbackDemos({
  t,
  labels,
}: {
  t: Dict['feedback'];
  labels: { dismiss: string };
}) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { showConfirm, showPrompt, showAlert } = useDialog();

  const flash = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t.openDialog}</Button>
      <Button variant="secondary" onClick={() => flash(t.published)}>
        {t.fireToast}
      </Button>
      <Button
        variant="secondary"
        onClick={() => showConfirm(t.confirmMessage, () => flash(t.deleted))}
      >
        showConfirm
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          showPrompt(
            t.promptMessage,
            (v) => flash(format(t.created, { name: v })),
            'mycel'
          )
        }
      >
        showPrompt
      </Button>
      <Button variant="ghost" onClick={() => showAlert(t.alertMessage)}>
        showAlert
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={t.publishTitle}
        description={t.publishNote}
        width={480}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {t.cancel}
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                flash(t.published);
              }}
            >
              {t.publish}
            </Button>
          </>
        }
      >
        <Input label="otp" placeholder="123456" />
      </Dialog>

      {toast && (
        <ToastStack>
          <Toast
            tone="ok"
            message={toast}
            onDismiss={() => setToast(null)}
            labels={labels}
          />
        </ToastStack>
      )}
    </>
  );
}
