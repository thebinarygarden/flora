'use client';

import * as React from 'react';
import { IconSearch } from '../icons/IconSearch';

export interface CommandPaletteItem {
  id: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
  hint?: string;
  /** extra words to match on, never displayed */
  keywords?: string;
}

export interface CommandPaletteProps {
  open?: boolean;
  /** render without a scrim, in flow, for docs and demos */
  inline?: boolean;
  items: CommandPaletteItem[];
  placeholder?: string;
  onSelect?: (item: CommandPaletteItem) => void;
  onClose?: () => void;
}

/**
 * ⌘K palette: blurred scrim, grouped filterable list, arrow/enter navigation.
 *
 * ```tsx
 * <CommandPalette open={open} onClose={close} onSelect={run} items={[
 *   { id: 'new', label: 'new project', group: 'actions', hint: '⌘N' },
 * ]} />
 * ```
 */
export function CommandPalette({
  open = true,
  inline = false,
  items = [],
  placeholder = 'type a command or search…',
  onSelect,
  onClose,
}: CommandPaletteProps) {
  const [q, setQ] = React.useState('');
  const [idx, setIdx] = React.useState(0);

  const filtered = React.useMemo(() => {
    if (!q) return items;
    const needle = q.toLowerCase();
    return items.filter((i) =>
      `${i.label} ${i.group || ''} ${i.keywords || ''}`
        .toLowerCase()
        .includes(needle)
    );
  }, [items, q]);

  React.useEffect(() => setIdx(0), [q]);

  // Grouped for display, but the keyboard cursor walks the flat filtered list,
  // so `idx` indexes `filtered` directly.
  const groups = React.useMemo(() => {
    const m = new Map<string, CommandPaletteItem[]>();
    filtered.forEach((i) => {
      const k = i.group || '';
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(i);
    });
    return [...m.entries()];
  }, [filtered]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[idx]) {
      onSelect?.(filtered[idx]);
    } else if (e.key === 'Escape') {
      onClose?.();
    }
  };

  if (!open) return null;

  const box = (
    <div
      className="fl-cmd"
      data-inline={inline}
      role="dialog"
      aria-label="command palette"
      onKeyDown={onKey}
    >
      <div className="fl-cmd-in">
        <IconSearch size={16} />
        <input
          // only as an overlay: inline, focusing on mount scrolls the page to it
          autoFocus={!inline}
          value={q}
          placeholder={placeholder}
          onChange={(e) => setQ(e.target.value)}
        />
        <kbd>esc</kbd>
      </div>
      <div className="fl-cmd-list" role="listbox">
        {filtered.length === 0 && (
          <div className="fl-cmd-empty">nothing for &quot;{q}&quot;</div>
        )}
        {groups.map(([g, list]) => (
          <div key={g}>
            {g && <div className="fl-cmd-head">{g}</div>}
            {list.map((it) => {
              const k = filtered.indexOf(it);
              return (
                <div
                  key={it.id}
                  role="option"
                  aria-selected={k === idx}
                  className="fl-cmd-item"
                  data-active={k === idx}
                  onMouseEnter={() => setIdx(k)}
                  onClick={() => onSelect?.(it)}
                >
                  {it.icon}
                  <span>{it.label}</span>
                  {it.hint && <span className="fl-cmd-hint">{it.hint}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  if (inline) return box;

  return (
    <div
      className="fl-cmd-scrim"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {box}
    </div>
  );
}
