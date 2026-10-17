'use client';

import * as React from 'react';

export interface ExpandingPickerOption {
  value: string;
  /** read by screen readers and shown as the tooltip */
  label: string;
  content: React.ReactNode;
}

export interface ExpandingPickerProps {
  options: ExpandingPickerOption[];
  value: string;
  onPick: (value: string) => void;
  /** names the group: "theme", "language" */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  /** false keeps it hidden and unanimated until the caller knows its value */
  ready?: boolean;
}

/**
 * Shared by ThemeToggleButton and LocaleToggleButton, so both look and move
 * the same. Collapsed it shows only the current option; one click opens all
 * of them, a second picks one and collapses it again. Clicking away or Escape
 * also collapses it. Internal, not exported from the package.
 */
export function ExpandingPicker({
  options,
  value,
  onPick,
  label,
  size = 'md',
  ready = true,
}: ExpandingPickerProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const pick = (next: string) => {
    onPick(next);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="fl-picker"
      data-size={size}
      data-open={open}
      data-ready={ready}
      role={open ? 'radiogroup' : undefined}
      aria-label={open ? label : undefined}
    >
      {options.map((o) => {
        const current = o.value === value;
        const hidden = !open && !current;
        return (
          <button
            key={o.value}
            type="button"
            className="fl-picker-opt"
            role={open ? 'radio' : undefined}
            aria-checked={open ? current : undefined}
            aria-expanded={open ? undefined : false}
            aria-label={open ? o.label : `${label}: ${o.label}`}
            title={open ? o.label : `${label}: ${o.label}`}
            aria-hidden={hidden || undefined}
            tabIndex={hidden ? -1 : undefined}
            data-current={current}
            onClick={() => (open ? pick(o.value) : setOpen(true))}
          >
            {o.content}
          </button>
        );
      })}
    </div>
  );
}
