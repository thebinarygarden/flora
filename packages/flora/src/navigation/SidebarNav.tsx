import * as React from 'react';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
}

export interface SidebarNavGroup {
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  current?: string;
  onSelect?: (id: string) => void;
  width?: number;
  className?: string;
}

/**
 * Grouped vertical navigation for docs and app shells. The current item gets a
 * 2px accent bar.
 *
 * ```tsx
 * <SidebarNav current="tokens" groups={[
 *   { title: 'foundations', items: [{ id: 'tokens', label: 'tokens' }] },
 * ]} />
 * ```
 */
export function SidebarNav({
  groups = [],
  current,
  onSelect,
  width,
  className = '',
}: SidebarNavProps) {
  return (
    <nav
      className={('fl-side ' + className).trim()}
      style={
        width
          ? ({ '--side-w': width + 'px' } as React.CSSProperties)
          : undefined
      }
    >
      {groups.map((g, gi) => (
        <div key={g.title ?? gi} className="fl-side-group">
          {g.title && <div className="fl-side-head">{g.title}</div>}
          {g.items.map((it) => {
            const Tag = it.href ? 'a' : 'button';
            return (
              <Tag
                key={it.id}
                href={it.href}
                className="fl-side-item"
                aria-current={current === it.id ? 'page' : undefined}
                // Only attach a handler when one was given, so a plain
                // href-based nav still renders from a server component.
                onClick={
                  onSelect
                    ? (e: React.MouseEvent) => {
                        if (!it.href) e.preventDefault();
                        onSelect(it.id);
                      }
                    : undefined
                }
              >
                {it.icon}
                <span>{it.label}</span>
                {it.badge !== undefined && (
                  <span className="fl-side-badge">{it.badge}</span>
                )}
              </Tag>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
