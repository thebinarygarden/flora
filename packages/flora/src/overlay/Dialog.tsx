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

  // An on-screen keyboard (iOS especially) covers the page without resizing
  // it. Fit the scrim to the part still visible, so the dialog centers above
  // the keyboard, and keep the field being typed in on screen.
  const scrim = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const vv = window.visualViewport;
    const el = scrim.current;
    if (!open || inline || !vv || !el) return;
    const fit = () => {
      el.style.top = vv.offsetTop + 'px';
      el.style.height = vv.height + 'px';
      el.style.bottom = 'auto';
    };
    const onResize = () => {
      fit();
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && el.contains(focused)) {
        focused.scrollIntoView({ block: 'nearest' });
      }
    };
    fit();
    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', fit);
    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', fit);
    };
  }, [open, inline]);

  if (!open) return null;

  return (
    <div
      ref={scrim}
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
