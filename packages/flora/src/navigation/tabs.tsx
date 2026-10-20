'use client';

import * as React from 'react';

export interface TabItem {
  value: string;
  label: string;
  count?: number;
  content?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** line = underline, for page sections; pill = segmented, for a view switch */
  variant?: 'line' | 'pill';
  className?: string;
}

/**
 * Section tabs (`line`) or a segmented view switch (`pill`). The active
 * indicator uses the accent.
 *
 * ```tsx
 * <Tabs items={[{ value: 'readme', label: 'readme' },
 *               { value: 'issues', label: 'issues', count: 12 }]} />
 * ```
 */
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'line',
  className = '',
}: TabsProps) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const cur = value !== undefined ? value : inner;
  const set = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };
  const active = items.find((i) => i.value === cur);

  return (
    <div className={className}>
      <div role="tablist" className="fl-tabs" data-variant={variant}>
        {items.map((it) => (
          <button
            key={it.value}
            role="tab"
            className="fl-tab"
            aria-selected={cur === it.value}
            onClick={() => set(it.value)}
          >
            {it.label}
            {it.count !== undefined && (
              <span className="fl-count">{it.count}</span>
            )}
          </button>
        ))}
      </div>
      {active?.content !== undefined && (
        <div role="tabpanel" className="fl-tabpanel" key={cur}>
          {active.content}
        </div>
      )}
    </div>
  );
}
