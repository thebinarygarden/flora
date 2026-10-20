'use client';

import { useState } from 'react';
import { Dialog, useDialog, useToast } from '@binarygarden/flora/overlay';
import { Button } from '@binarygarden/flora/form';
import { Input } from '@binarygarden/flora/form';
import { format } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

export function FeedbackDemos({ t }: { t: Dict['feedback'] }) {
  const [open, setOpen] = useState(false);
  const { showConfirm, showPrompt, showAlert } = useDialog();
  const { showToast } = useToast();

  const flash = (message: string) => showToast({ tone: 'ok', message });

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
        onSubmit={() => {
          setOpen(false);
          flash(t.published);
        }}
        footer={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button type="submit">{t.publish}</Button>
          </>
        }
      >
        <Input label="otp" placeholder="123456" />
      </Dialog>
    </>
  );
}
