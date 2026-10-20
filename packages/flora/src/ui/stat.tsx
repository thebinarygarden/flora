import * as React from 'react';
import { Card, type CardProps } from './card';

export interface StatProps
  extends Omit<CardProps, 'title' | 'description' | 'children'> {
  label: string;
  value: React.ReactNode;
  /** a line of context under the value */
  hint?: string;
}

/**
 * One number on a card, with its label above. Other attributes go to the card,
 * so a parent grid can size it.
 *
 * ```tsx
 * <Stat label="orders" value="128" hint="12 more than last week" />
 * ```
 */
export function Stat({
  label,
  value,
  hint,
  className = '',
  ...rest
}: StatProps) {
  return (
    <Card className={('fl-stat ' + className).trim()} {...rest}>
      <span className="fl-stat-label">{label}</span>
      <span className="fl-stat-value">{value}</span>
      {hint && <span className="fl-stat-hint">{hint}</span>}
    </Card>
  );
}
