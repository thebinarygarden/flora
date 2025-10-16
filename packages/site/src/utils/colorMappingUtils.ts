/**
 * Shared color mapping utilities for showcase components
 * Provides consistent color mapping logic across all theme previews
 */

import type { BadgeProps } from '@binarygarden/flora/ui';

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'error'
  | 'warning';

export type ChangeType = 'positive' | 'negative' | 'neutral';

export type BadgeVariant = BadgeProps['variant'];

/**
 * Maps color variant names to CSS variable styles
 * Returns backgroundColor and color properties for the given variant
 */
export function getColorStyle(color: ColorVariant) {
  switch (color) {
    case 'primary':
      return {
        backgroundColor: 'var(--primary)',
        color: 'var(--on-primary)',
      };
    case 'secondary':
      return {
        backgroundColor: 'var(--secondary)',
        color: 'var(--on-secondary)',
      };
    case 'tertiary':
      return {
        backgroundColor: 'var(--tertiary)',
        color: 'var(--on-tertiary)',
      };
    case 'success':
      return {
        backgroundColor: 'var(--success)',
        color: 'var(--on-success)',
      };
    case 'error':
      return {
        backgroundColor: 'var(--error)',
        color: 'var(--on-error)',
      };
    case 'warning':
      return {
        backgroundColor: 'var(--warning)',
        color: 'var(--on-warning)',
      };
  }
}

/**
 * Maps change type (positive/negative/neutral) to semantic color
 * Returns the CSS variable name for the appropriate color
 */
export function getChangeColor(changeType: ChangeType): string {
  switch (changeType) {
    case 'positive':
      return 'var(--success)';
    case 'negative':
      return 'var(--error)';
    case 'neutral':
      return 'var(--warning)';
  }
}

/**
 * Maps status dot colors for activity/status indicators
 * Returns CSS variable for online/busy/away/offline states
 */
export function getStatusDotColor(status: string): string {
  switch (status) {
    case 'online':
      return 'var(--success)';
    case 'busy':
      return 'var(--error)';
    case 'away':
      return 'var(--warning)';
    case 'offline':
      return 'var(--disabled)';
    default:
      return 'var(--border)';
  }
}

/**
 * Maps status strings to badge variants for consistent badge usage
 * Handles various status types: project status, activity types, etc.
 */
export function getStatusBadgeVariant(status: string): BadgeVariant {
  switch (status) {
    case 'success':
    case 'Complete':
      return 'success';
    case 'primary':
    case 'In Progress':
      return 'primary';
    case 'error':
      return 'error';
    case 'secondary':
    case 'Planning':
      return 'secondary';
    case 'tertiary':
      return 'tertiary';
    case 'Review':
      return 'warning';
    default:
      return 'outline';
  }
}

/**
 * Maps skill levels to appropriate badge color variants
 * Used for expertise/proficiency indicators
 */
export function getLevelBadgeVariant(
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
): BadgeVariant {
  switch (level) {
    case 'Expert':
      return 'success';
    case 'Advanced':
      return 'primary';
    case 'Intermediate':
      return 'warning';
    case 'Beginner':
      return 'error';
    default:
      return 'outline';
  }
}

/**
 * Creates style object for tab components with active/inactive states
 * Supports primary, secondary, and tertiary color variants
 */
export function getTabStyle(
  color: 'primary' | 'secondary' | 'tertiary',
  isActive: boolean
) {
  const baseStyle = {
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
  };

  if (isActive) {
    switch (color) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
          borderColor: 'var(--primary)',
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: 'var(--secondary)',
          color: 'var(--on-secondary)',
          borderColor: 'var(--secondary)',
        };
      case 'tertiary':
        return {
          ...baseStyle,
          backgroundColor: 'var(--tertiary)',
          color: 'var(--on-tertiary)',
          borderColor: 'var(--tertiary)',
        };
    }
  } else {
    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      color: 'var(--on-surface)',
      borderColor: 'var(--border)',
    };
  }
}
