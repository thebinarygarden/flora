import * as React from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  /** e.g. "⌘K", rendered faint after the label */
  shortcut?: string;
  side?: 'top' | 'bottom';
  /** force it visible, for docs and demos */
  open?: boolean;
  children: React.ReactNode;
}

/**
 * Inverted-neutral label shown on hover or focus. One line, lowercase.
 *
 * ```tsx
 * <Tooltip content="search" shortcut="⌘K">
 *   <IconButton label="search"><IconSearch size={18} /></IconButton>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  shortcut,
  side = 'top',
  open,
  children,
}: TooltipProps) {
  return (
    <span className="fl-tipwrap">
      {children}
      <span role="tooltip" className="fl-tip" data-side={side} data-open={open}>
        {content}
        {shortcut && <kbd>{shortcut}</kbd>}
      </span>
    </span>
  );
}
