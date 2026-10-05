import * as React from 'react';

export interface TagProps {
  /** filled with the accent when selected */
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** shows a remove affordance; mutually exclusive with the toggle form */
  onRemove?: () => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Pill-shaped filter or topic chip. Either it toggles (`selected` + `onClick`)
 * or it is removable (`onRemove`) — a pill that did both would have to nest a
 * button inside a button, so the two forms are kept separate.
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
  children,
}: TagProps) {
  if (onRemove) {
    return (
      <span className={('fl-tag ' + className).trim()} data-static="true">
        {children}
        <button
          type="button"
          className="fl-x"
          aria-label="remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          ×
        </button>
      </span>
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
