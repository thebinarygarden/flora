'use client';

import * as React from 'react';

export interface ToastProps {
  message: string;
  description?: string;
  tone?: 'neutral' | 'ok' | 'danger' | 'accent';
  /** a short lowercase verb, e.g. "undo" */
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

/**
 * Inverted-neutral notification that rises in. Wrap in a {@link ToastStack}.
 * Inside a product scope, `tone="accent"` fills with the product hue.
 *
 * ```tsx
 * <ToastStack>
 *   <Toast tone="ok" message="published" action="view" onAction={go} />
 * </ToastStack>
 * ```
 */
export function Toast({
  message,
  description,
  tone = 'neutral',
  action,
  onAction,
  onDismiss,
}: ToastProps) {
  return (
    <div role="status" className="fl-toast" data-tone={tone}>
      <span className="fl-toast-dot" aria-hidden="true" />
      <span className="fl-toast-msg">
        {message}
        {description && <span className="fl-toast-desc">{description}</span>}
      </span>
      {action && <button onClick={onAction}>{action}</button>}
      {onDismiss && (
        <button aria-label="dismiss" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  );
}

export interface ToastStackProps {
  /** render in flow rather than fixed to the corner */
  inline?: boolean;
  children?: React.ReactNode;
}

/** Positions toasts bottom-right and stacks them. */
export function ToastStack({ inline = false, children }: ToastStackProps) {
  return (
    <div className="fl-toasts" data-inline={inline}>
      {children}
    </div>
  );
}
