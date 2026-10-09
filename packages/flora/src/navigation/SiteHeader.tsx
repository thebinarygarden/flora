'use client';

import * as React from 'react';
import { IconButton } from '../form/IconButton';
import { IconMenu, IconX } from '../icons';

export interface SiteHeaderLink {
  label: string;
  href: string;
  /** marks this link as the current page */
  current?: boolean;
}

export interface SiteHeaderProps {
  /** the logo mark and wordmark */
  brand: React.ReactNode;
  brandHref?: string;
  links?: SiteHeaderLink[];
  /** right-hand controls: a theme toggle, a search button, a call to action */
  actions?: React.ReactNode;
  /**
   * a CSS selector. The bar overlays the page and stays hidden until the
   * matching element scrolls off the top, then slides in — for a landing hero
   * that carries the nav itself, e.g. `'.fl-hero-actions'`.
   */
  revealAfter?: string;
  className?: string;
}

/**
 * The sticky 60px site bar: brand on the left, links beside it, actions on the
 * right. Translucent over a blurred page background. Below 720px the links
 * and actions fold into a menu button that opens them in a panel under the bar.
 *
 * ```tsx
 * <SiteHeader
 *   brand={<><IconBGLogo size={24} /><span className="fl-header-brand-name">binary garden</span></>}
 *   links={[{ label: 'projects', href: '#projects' }]}
 *   actions={<ThemeToggleButton />}
 * />
 * ```
 *
 * Pass `revealAfter` to keep the bar hidden over a hero until its buttons have
 * scrolled away.
 */
export function SiteHeader({
  brand,
  brandHref = '/',
  links = [],
  actions,
  revealAfter,
  className = '',
}: SiteHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const [past, setPast] = React.useState(false);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!revealAfter) return;
    const target = document.querySelector(revealAfter);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) =>
      setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [revealAfter]);

  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const wide = window.matchMedia('(min-width: 721px)');
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', close);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', close);
    };
  }, [open]);

  const hasMenu = links.length > 0 || Boolean(actions);

  return (
    <header
      className={('fl-header ' + className).trim()}
      data-reveal={revealAfter ? '' : undefined}
      data-hidden={revealAfter ? !past : undefined}
    >
      <div className="fl-header-in">
        <a className="fl-header-brand" href={brandHref}>
          {brand}
        </a>
        {hasMenu && (
          <div
            id={menuId}
            className="fl-header-menu"
            data-open={open}
            style={
              {
                '--items': links.length + (actions ? 1 : 0),
              } as React.CSSProperties
            }
          >
            {links.length > 0 && (
              <nav className="fl-header-nav">
                {links.map((l, i) => (
                  <a
                    key={l.href + l.label}
                    href={l.href}
                    className="fl-header-link"
                    style={{ '--i': i } as React.CSSProperties}
                    aria-current={l.current ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            )}
            {actions && (
              <div
                className="fl-header-actions"
                style={{ '--i': links.length } as React.CSSProperties}
              >
                {actions}
              </div>
            )}
          </div>
        )}
        {hasMenu && (
          <IconButton
            className="fl-header-menu-btn"
            label={open ? 'close menu' : 'open menu'}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(!open)}
          >
            {open ? <IconX size={16} /> : <IconMenu size={16} />}
          </IconButton>
        )}
      </div>
    </header>
  );
}
