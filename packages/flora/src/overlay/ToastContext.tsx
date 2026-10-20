'use client';

import * as React from 'react';
import { Toast, ToastStack, type ToastLabels, type ToastProps } from './Toast';

export type ToastOptions = Omit<ToastProps, 'onDismiss' | 'labels'>;

export interface ToastContextValue {
  showToast: (toast: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

type Entry = ToastOptions & { id: number };

/**
 * App-wide toasts. Mount once near the root, then call
 * `useToast().showToast({ message: 'published', tone: 'ok' })` from anywhere.
 * Each toast dismisses itself after `duration` ms, or when its action runs.
 */
export const ToastProvider = ({
  children,
  labels,
  duration = 3500,
}: {
  children: React.ReactNode;
  labels?: Partial<ToastLabels>;
  duration?: number;
}) => {
  const [toasts, setToasts] = React.useState<Entry[]>([]);
  const timers = React.useRef(new Map<number, number>());
  const nextId = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((all) => all.filter((t) => t.id !== id));
  }, []);

  const showToast = React.useCallback(
    (toast: ToastOptions) => {
      const id = nextId.current++;
      setToasts((all) => [...all, { ...toast, id }]);
      timers.current.set(
        id,
        window.setTimeout(() => dismiss(id), duration)
      );
    },
    [dismiss, duration]
  );

  React.useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const timer of pending.values()) window.clearTimeout(timer);
    };
  }, []);

  const value = React.useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <ToastStack>
          {toasts.map(({ id, onAction, ...toast }) => (
            <Toast
              key={id}
              {...toast}
              labels={labels}
              onAction={
                onAction
                  ? () => {
                      onAction();
                      dismiss(id);
                    }
                  : undefined
              }
              onDismiss={() => dismiss(id)}
            />
          ))}
        </ToastStack>
      )}
    </ToastContext.Provider>
  );
};
