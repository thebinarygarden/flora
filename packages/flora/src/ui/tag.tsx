import * as React from 'react';

const tagLabels = { remove: 'remove' };

export type TagLabels = typeof tagLabels;

export interface TagProps {
  /** filled with the accent when selected */
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** the whole pill removes it; mutually exclusive with the toggle form */
  onRemove?: () => void;
  className?: string;
  labels?: Partial<TagLabels>;
  children: React.ReactNode;
}

/**
 * Pill-shaped filter or topic chip. Either it toggles (`selected` + `onClick`)
 * or it is removable (`onRemove`) — a pill that did both would have to nest a
 * button inside a button, so the two forms are kept separate. A removable tag
 * is one button, since a lone × is too small to hit on a touch screen; the ×
 * stays as the sign that it goes.
 *
 * ```tsx
 * <Tag selected onClick={pick}>design</Tag>
 * <Tag onRemove={drop}>typescript</Tag>
 * ```
 */
export function Tag({
  selected = false,
  onClick,
  onRemove,
  className = '',
  labels,
  children,
}: TagProps) {
  const l = { ...tagLabels, ...labels };
  if (onRemove) {
    return (
      <button
        type="button"
        className={('fl-tag ' + className).trim()}
        data-removable="true"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <span className="fl-sr">{l.remove}</span>
        {children}
        <span className="fl-x" aria-hidden="true">
          ×
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={('fl-tag ' + className).trim()}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
