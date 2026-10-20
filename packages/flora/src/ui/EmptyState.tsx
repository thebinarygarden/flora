import * as React from 'react';

export interface EmptyStateProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * What a list or page shows when it has nothing yet: one short, muted line,
 * centered in generous space.
 *
 * ```tsx
 * <EmptyState>no orders yet.</EmptyState>
 * ```
 */
export function EmptyState({ className = '', children }: EmptyStateProps) {
  return <p className={('fl-empty ' + className).trim()}>{children}</p>;
}
