'use client';

import * as React from 'react';

export interface DialogProps {
  open?: boolean;
  /** render in flow without a scrim, for docs and demos */
  inline?: boolean;
  title?: string;
  description?: string;
  /** usually two Buttons: a ghost cancel and a primary confirm */
  footer?: React.ReactNode;
  width?: number;
  onClose?: () => void;
  children?: React.ReactNode;
}

/**
 * Centered modal over a blurred scrim, growing in on the spring curve. Keep to
 * one decision per dialog.
 *
 * ```tsx
 * <Dialog open title="delete repo?" description="this can't be undone."
 *   footer={<><Button variant="ghost">cancel</Button>
 *             <Button variant="danger">delete</Button></>}
 *   onClose={close} />
 * ```
 */
export function Dialog({
  open = true,
  inline = false,
  title,
  description,
  footer,
  width,
  onClose,
  children,
}: DialogProps) {
  // Escape to close, and don't let the page behind scroll while it's up.
  React.useEffect(() => {
    if (!open || inline) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, inline, onClose]);

  if (!open) return null;

  return (
    <div
      className="fl-dlg-scrim"
      data-inline={inline}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal={!inline}
        aria-label={title}
        className="fl-dlg"
        style={
          width
            ? ({ '--dlg-w': width + 'px' } as React.CSSProperties)
            : undefined
        }
      >
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {children}
        {footer && <div className="fl-dlg-foot">{footer}</div>}
      </div>
    </div>
  );
}
