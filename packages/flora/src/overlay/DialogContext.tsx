'use client';

import * as React from 'react';
import { Dialog } from './Dialog';
import { Button } from '../form/Button';
import { Input } from '../form/Input';

export interface DialogOptions {
  title?: string;
  description?: string;
  width?: number;
}

export interface DialogContextValue {
  showDialog: (content: React.ReactNode, options?: DialogOptions) => void;
  showAlert: (message: string, options?: DialogOptions) => void;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: DialogOptions
  ) => void;
  showPrompt: (
    message: string,
    onSubmit: (value: string) => void,
    defaultValue?: string,
    options?: DialogOptions
  ) => void;
  closeDialog: () => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(
  undefined
);

export const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

interface Current {
  content: React.ReactNode;
  footer?: React.ReactNode;
  options: DialogOptions;
}

/**
 * App-wide imperative dialog. Mount once near the root, then call
 * `useDialog().showConfirm(…)` from anywhere.
 */
export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [current, setCurrent] = React.useState<Current | null>(null);

  const closeDialog = React.useCallback(() => setCurrent(null), []);

  const showDialog = React.useCallback(
    (content: React.ReactNode, options: DialogOptions = {}) =>
      setCurrent({ content, options }),
    []
  );

  const showAlert = React.useCallback(
    (message: string, options: DialogOptions = {}) =>
      setCurrent({
        content: null,
        options: { description: message, ...options },
        footer: <Button onClick={closeDialog}>ok</Button>,
      }),
    [closeDialog]
  );

  const showConfirm = React.useCallback(
    (
      message: string,
      onConfirm: () => void,
      onCancel?: () => void,
      options: DialogOptions = {}
    ) =>
      setCurrent({
        content: null,
        options: { description: message, ...options },
        footer: (
          <>
            <Button
              variant="ghost"
              onClick={() => {
                onCancel?.();
                closeDialog();
              }}
            >
              cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                closeDialog();
              }}
            >
              confirm
            </Button>
          </>
        ),
      }),
    [closeDialog]
  );

  const showPrompt = React.useCallback(
    (
      message: string,
      onSubmit: (value: string) => void,
      defaultValue = '',
      options: DialogOptions = {}
    ) => {
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = new FormData(e.currentTarget).get('promptInput');
        if (typeof value === 'string' && value.trim()) {
          onSubmit(value.trim());
          closeDialog();
        }
      };
      setCurrent({
        options: { description: message, ...options },
        content: (
          <form id="fl-prompt" onSubmit={handleSubmit}>
            <Input name="promptInput" defaultValue={defaultValue} autoFocus />
          </form>
        ),
        footer: (
          <>
            <Button type="button" variant="ghost" onClick={closeDialog}>
              cancel
            </Button>
            <Button type="submit" form="fl-prompt">
              submit
            </Button>
          </>
        ),
      });
    },
    [closeDialog]
  );

  const contextValue: DialogContextValue = {
    showDialog,
    showAlert,
    showConfirm,
    showPrompt,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {current && (
        <Dialog
          open
          onClose={closeDialog}
          title={current.options.title}
          description={current.options.description}
          width={current.options.width}
          footer={current.footer}
        >
          {current.content}
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};
