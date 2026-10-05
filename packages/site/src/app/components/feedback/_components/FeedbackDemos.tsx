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

export function FeedbackDemos() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { showConfirm, showPrompt, showAlert } = useDialog();

  const flash = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>open a dialog</Button>
      <Button variant="secondary" onClick={() => flash('published')}>
        fire a toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => showConfirm('delete this repo?', () => flash('deleted'))}
      >
        showConfirm
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          showPrompt('name the project', (v) => flash(`created ${v}`), 'mycel')
        }
      >
        showPrompt
      </Button>
      <Button variant="ghost" onClick={() => showAlert('nothing to publish.')}>
        showAlert
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="publish flora?"
        description="this pushes 0.1.0 to npm and cannot be undone."
        width={480}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                flash('published');
              }}
            >
              publish
            </Button>
          </>
        }
      >
        <Input label="otp" placeholder="123456" />
      </Dialog>

      {toast && (
        <ToastStack>
          <Toast tone="ok" message={toast} onDismiss={() => setToast(null)} />
        </ToastStack>
      )}
    </>
  );
}
