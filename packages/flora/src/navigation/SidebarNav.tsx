'use client';

import * as React from 'react';
import { IconArrow } from '../icons/IconArrow';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  /** Sub-items, shown under this item while it or one of them is current. */
  children?: SidebarNavItem[];
}

export interface SidebarNavGroup {
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  current?: string;
  onSelect?: (id: string) => void;
  /** Fixed width, or the controlled width when `collapsible`. */
  width?: number;
  className?: string;
  /** Adds a drag handle to resize it and a chevron to collapse it to a rail. */
  collapsible?: boolean;
  defaultWidth?: number;
  onWidthChange?: (width: number) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Shown above the groups; hidden when collapsed. */
  header?: React.ReactNode;
  /** Shown below the groups; hidden when collapsed. */
  footer?: React.ReactNode;
}

const MIN_WIDTH = 180;
const MAX_WIDTH = 360;
// Releasing a drag narrower than this collapses the sidebar.
const SNAP_WIDTH = 120;
const KEY_STEP = 16;

const clamp = (w: number) => Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, w));

/**
 * Grouped vertical navigation for docs and app shells. The current item gets a
 * 2px accent bar. Items can carry sub-items, and `collapsible` lets the user
 * drag it wider or narrower and fold it to a rail.
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
  collapsible = false,
  defaultWidth = 240,
  onWidthChange,
  collapsed,
  onCollapsedChange,
  header,
  footer,
}: SidebarNavProps) {
  const [ownWidth, setOwnWidth] = React.useState(defaultWidth);
  const [ownCollapsed, setOwnCollapsed] = React.useState(false);
  const drag = React.useRef<{ x: number; width: number; raw: number }>(null);
  const [dragging, setDragging] = React.useState(false);

  const w = width ?? (collapsible ? ownWidth : undefined);
  const isCollapsed = collapsible && (collapsed ?? ownCollapsed);

  const setWidth = (next: number) => {
    setOwnWidth(next);
    onWidthChange?.(next);
  };
  const setCollapsed = (next: boolean) => {
    setOwnCollapsed(next);
    onCollapsedChange?.(next);
  };
  const endDrag = () => {
    // Collapsing reopens at the width it had before the drag.
    if (drag.current && drag.current.raw < SNAP_WIDTH) {
      setWidth(drag.current.width);
      setCollapsed(true);
    }
    drag.current = null;
    setDragging(false);
  };

  const renderItem = (it: SidebarNavItem) => {
    const Tag = it.href ? 'a' : 'button';
    const open =
      it.children?.length &&
      (current === it.id || it.children.some((c) => c.id === current));
    return (
      <React.Fragment key={it.id}>
        <Tag
          href={it.href}
          className="fl-side-item"
          aria-current={current === it.id ? 'page' : undefined}
          data-open={open || undefined}
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
        {open && (
          <div className="fl-side-sub">{it.children!.map(renderItem)}</div>
        )}
      </React.Fragment>
    );
  };

  if (isCollapsed) {
    return (
      <nav
        className={('fl-side ' + className).trim()}
        data-collapsible
        data-collapsed
      >
        <button
          type="button"
          className="fl-side-rail"
          aria-label="expand sidebar"
          onClick={() => setCollapsed(false)}
        >
          <IconArrow orientation="right" size={12} />
        </button>
      </nav>
    );
  }

  return (
    <nav
      className={('fl-side ' + className).trim()}
      data-collapsible={collapsible || undefined}
      style={w ? ({ '--side-w': w + 'px' } as React.CSSProperties) : undefined}
    >
      {(header || collapsible) && (
        <div className="fl-side-top">
          {header}
          {collapsible && (
            <button
              type="button"
              className="fl-side-toggle"
              aria-label="collapse sidebar"
              onClick={() => setCollapsed(true)}
            >
              <IconArrow orientation="left" size={12} />
            </button>
          )}
        </div>
      )}
      {groups.map((g, gi) => (
        <div key={g.title ?? gi} className="fl-side-group">
          {g.title && <div className="fl-side-head">{g.title}</div>}
          {g.items.map(renderItem)}
        </div>
      ))}
      {footer && <div className="fl-side-foot">{footer}</div>}
      {collapsible && (
        <div
          className="fl-side-handle"
          role="separator"
          aria-orientation="vertical"
          aria-label="resize sidebar"
          aria-valuenow={w}
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={MAX_WIDTH}
          tabIndex={0}
          data-dragging={dragging || undefined}
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            const start = e.currentTarget.parentElement!.offsetWidth;
            drag.current = { x: e.clientX, width: start, raw: start };
            setDragging(true);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            drag.current.raw = drag.current.width + e.clientX - drag.current.x;
            setWidth(clamp(drag.current.raw));
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setWidth(clamp((w ?? 0) - KEY_STEP));
            else if (e.key === 'ArrowRight')
              setWidth(clamp((w ?? 0) + KEY_STEP));
            else if (e.key === 'Enter') setCollapsed(true);
            else return;
            e.preventDefault();
          }}
        />
      )}
    </nav>
  );
}
