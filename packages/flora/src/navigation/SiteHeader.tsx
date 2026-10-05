import * as React from 'react';

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
  className?: string;
}

/**
 * The sticky 60px site bar: brand on the left, links beside it, actions on the
 * right. Translucent over a blurred page background. Links hide below 720px —
 * pair it with a MobileNav there if the site needs one.
 *
 * ```tsx
 * <SiteHeader
 *   brand={<><IconBGLogo size={24} /><span className="fl-header-brand-name">binary garden</span></>}
 *   links={[{ label: 'projects', href: '#projects' }]}
 *   actions={<ThemeToggleButton />}
 * />
 * ```
 */
export function SiteHeader({
  brand,
  brandHref = '/',
  links = [],
  actions,
  className = '',
}: SiteHeaderProps) {
  return (
    <header className={('fl-header ' + className).trim()}>
      <div className="fl-header-in">
        <a className="fl-header-brand" href={brandHref}>
          {brand}
        </a>
        {links.length > 0 && (
          <nav className="fl-header-nav">
            {links.map((l) => (
              <a
                key={l.href + l.label}
                href={l.href}
                className="fl-header-link"
                aria-current={l.current ? 'page' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
        {actions && <div className="fl-header-actions">{actions}</div>}
      </div>
    </header>
  );
}
