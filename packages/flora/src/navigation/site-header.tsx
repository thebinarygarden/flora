'use client';

import * as React from 'react';
import { IconButton } from '../form/icon-button';
import { IconMenu, IconX } from '../icons';

export interface SiteHeaderLink {
  label: string;
  href: string;
  /** marks this link as the current page */
  current?: boolean;
}

const siteHeaderLabels = { open: 'open menu', close: 'close menu' };

export type SiteHeaderLabels = typeof siteHeaderLabels;

export interface SiteHeaderProps {
  /** the logo mark and wordmark */
  brand: React.ReactNode;
  brandHref?: string;
  links?: SiteHeaderLink[];
  /** right-hand controls: a theme toggle, a search button, a call to action */
  actions?: React.ReactNode;
  /**
   * the page opens with a BGLanding: the bar overlays it, stays hidden, and
   * slides in once the landing has scrolled away. With no BGLanding on the
   * page the bar simply shows.
   */
  overLanding?: boolean;
  className?: string;
  labels?: Partial<SiteHeaderLabels>;
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
 * Pass `overLanding` to keep the bar hidden over a BGLanding until it has
 * scrolled away. Give the landing's `corner` the same small controls as
 * `actions`: they scroll away with the hero and come back in the bar.
 */
export function SiteHeader({
  brand,
  brandHref = '/',
  links = [],
  actions,
  overLanding,
  className = '',
  labels,
}: SiteHeaderProps) {
  const l = { ...siteHeaderLabels, ...labels };
  const [open, setOpen] = React.useState(false);
  const [past, setPast] = React.useState(false);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!overLanding) return;
    const landing = document.querySelector('.fl-bgl');
    if (!landing) return setPast(true);
    // the root starts under the bar, so it reveals as the landing's bottom
    // edge passes beneath it
    const observer = new IntersectionObserver(
      ([entry]) => {
        const past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setPast(past);
        // back over the hero the bar is gone, so its menu panel goes too
        if (!past) setOpen(false);
      },
      { rootMargin: '-60px 0px 0px 0px' }
    );
    observer.observe(landing);
    return () => observer.disconnect();
  }, [overLanding]);

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
      data-reveal={overLanding ? '' : undefined}
      data-hidden={overLanding ? !past : undefined}
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
                {/* remounted as the bar hides or shows, so a picker left
                    open comes back closed */}
                <React.Fragment key={String(past)}>{actions}</React.Fragment>
              </div>
            )}
          </div>
        )}
        {hasMenu && (
          <IconButton
            className="fl-header-menu-btn"
            label={open ? l.close : l.open}
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
