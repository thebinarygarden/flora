'use client';

import * as React from 'react';

const splitButtonLabels = { more: 'more options' };

export type SplitButtonLabels = typeof splitButtonLabels;

export interface SplitButtonItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  /** underlined, e.g. the options that fit the visitor's device */
  highlighted?: boolean;
}

export interface SplitButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  /** the main part is a link when given, else a button */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** the links behind the caret */
  items: SplitButtonItem[];
  labels?: Partial<SplitButtonLabels>;
  className?: string;
  children: React.ReactNode;
}

/**
 * One control with the likely choice on its face and the alternatives behind
 * a caret. The main part acts straight away; the caret opens a menu of links.
 * Clicking away or Escape closes it. The outer box draws the button, so both
 * parts always share one height and move together.
 *
 * ```tsx
 * <SplitButton
 *   href={mac}
 *   items={[{ label: 'mac', href: mac, highlighted: true }, { label: 'linux', href: linux }]}
 * >
 *   download for mac
 * </SplitButton>
 * ```
 */
export function SplitButton({
  variant = 'primary',
  size = 'md',
  iconLeft,
  href,
  onClick,
  items,
  labels,
  className = '',
  children,
}: SplitButtonProps) {
  const l = { ...splitButtonLabels, ...labels };
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('click', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const face = (
    <>
      {iconLeft}
      <span>{children}</span>
    </>
  );

  return (
    <div
      ref={ref}
      className={('fl-split ' + className).trim()}
      data-variant={variant}
      data-size={size}
      data-open={open}
    >
      {href ? (
        <a className="fl-split-main" href={href} onClick={onClick}>
          {face}
        </a>
      ) : (
        <button type="button" className="fl-split-main" onClick={onClick}>
          {face}
        </button>
      )}
      <button
        type="button"
        className="fl-split-toggle"
        aria-label={l.more}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="fl-split-caret" aria-hidden="true" />
      </button>
      {open && (
        <div id={menuId} className="fl-split-menu" role="menu">
          {items.map((item) => (
            <a
              key={item.href}
              role="menuitem"
              className="fl-split-item"
              href={item.href}
              data-highlighted={item.highlighted || undefined}
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
