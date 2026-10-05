import * as React from 'react';

export interface BGFooterProps {
  /** the logo mark */
  brand?: React.ReactNode;
  links?: { label: string; href: string }[];
  /** copyright and licence line */
  legal?: string;
  className?: string;
}

/**
 * The garden's footer: the logo and the motto on the left, a short row of
 * links on the right, the legal line underneath. The motto is fixed — it is
 * the garden's, not the product's — and always inverts the page, black on
 * light and white on dark.
 *
 * ```tsx
 * <BGFooter
 *   brand={<IconBGLogo size={28} />}
 *   links={[{ label: 'trunk', href: 'https://binarygarden.com' }]}
 *   legal="© 2026 binary garden · mit"
 * />
 * ```
 */
export function BGFooter({
  brand,
  links = [],
  legal,
  className = '',
}: BGFooterProps) {
  return (
    <footer className={('fl-footer ' + className).trim()}>
      <div className="fl-footer-in">
        <div className="fl-footer-brand">
          {brand}
          <span className="fl-footer-motto">simul sumus plus</span>
        </div>
        {links.length > 0 && (
          <nav className="fl-footer-links">
            {links.map((l) => (
              <a key={l.href + l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        )}
        {legal && <div className="fl-footer-legal">{legal}</div>}
      </div>
    </footer>
  );
}
