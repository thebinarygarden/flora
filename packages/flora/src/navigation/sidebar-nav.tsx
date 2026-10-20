'use client';

import * as React from 'react';
import { IconArrow } from '../icons/icon-arrow';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  /**
   * Sub-items, shown under this item while it or one of them is current. A
   * chevron beside it shows or hides them either way.
   */
  children?: SidebarNavItem[];
}

export interface SidebarNavGroup {
  title?: string;
  items: SidebarNavItem[];
}

const sidebarNavLabels = {
  expand: 'expand sidebar',
  resize: 'resize sidebar',
};

export type SidebarNavLabels = typeof sidebarNavLabels;

export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  current?: string;
  onSelect?: (id: string) => void;
  /** Fixed width, or the controlled width when `collapsible`. */
  width?: number;
  className?: string;
  /**
   * Adds a drag handle to resize it. Dragging it past the minimum folds it to
   * a rail with a chevron that opens it again.
   */
  collapsible?: boolean;
  defaultWidth?: number;
  onWidthChange?: (width: number) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Shown above the groups; hidden when collapsed. */
  header?: React.ReactNode;
  /** Shown below the groups; hidden when collapsed. */
  footer?: React.ReactNode;
  labels?: Partial<SidebarNavLabels>;
}

const MIN_WIDTH = 140;
const MAX_WIDTH = 360;
// The collapsed rail. A drag can follow the pointer down to it.
const RAIL_WIDTH = 44;
// Releasing a drag narrower than this collapses the sidebar.
const SNAP_WIDTH = 110;
const KEY_STEP = 16;

const clamp = (w: number, min = MIN_WIDTH) =>
  Math.min(MAX_WIDTH, Math.max(min, w));

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
  labels,
}: SidebarNavProps) {
  const l = { ...sidebarNavLabels, ...labels };
  const [ownWidth, setOwnWidth] = React.useState(defaultWidth);
  const [ownCollapsed, setOwnCollapsed] = React.useState(false);
  const drag = React.useRef<{ x: number; width: number; raw: number }>(null);
  const [dragging, setDragging] = React.useState(false);
  // True while a drag is narrow enough that letting go will collapse it.
  const [closing, setClosing] = React.useState(false);
  // Sub-item lists the user opened or closed with the chevron, by item id.
  const [toggled, setToggled] = React.useState<Record<string, boolean>>({});

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
    const d = drag.current;
    if (d && d.raw < SNAP_WIDTH) {
      // Collapsing reopens at the width it had before the drag.
      setWidth(d.width);
      setCollapsed(true);
    } else if (d) {
      setWidth(clamp(d.raw));
    }
    drag.current = null;
    setDragging(false);
    setClosing(false);
  };

  const renderItem = (it: SidebarNavItem) => {
    const Tag = it.href ? 'a' : 'button';
    // A boolean, not the length: `{0 && ...}` would render a stray "0".
    const parent = !!it.children?.length;
    const open =
      parent &&
      (toggled[it.id] ??
        (current === it.id || it.children!.some((c) => c.id === current)));
    const item = (
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
    );
    return (
      <React.Fragment key={it.id}>
        {parent ? (
          <div className="fl-side-row">
            {item}
            <button
              type="button"
              className="fl-side-expand"
              aria-label={it.label}
              aria-expanded={open}
              onClick={() => setToggled((t) => ({ ...t, [it.id]: !open }))}
            >
              <IconArrow orientation={open ? 'down' : 'right'} size={14} />
            </button>
          </div>
        ) : (
          item
        )}
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
          aria-label={l.expand}
          onClick={() => setCollapsed(false)}
        >
          <IconArrow orientation="right" size={28} />
        </button>
      </nav>
    );
  }

  return (
    <nav
      className={('fl-side ' + className).trim()}
      data-collapsible={collapsible || undefined}
      data-closing={closing || undefined}
      style={w ? ({ '--side-w': w + 'px' } as React.CSSProperties) : undefined}
    >
      {header && <div className="fl-side-top">{header}</div>}
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
          aria-label={l.resize}
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
            // Follow the pointer below the minimum so the user sees it about
            // to fold; endDrag settles on the minimum or collapses.
            setWidth(clamp(drag.current.raw, RAIL_WIDTH));
            setClosing(drag.current.raw < SNAP_WIDTH);
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
