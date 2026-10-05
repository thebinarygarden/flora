import * as React from 'react';

export interface Person {
  name: string;
  src?: string;
}

export interface AvatarGroupProps {
  people: Person[];
  /** overflow collapses into a +n chip */
  max?: number;
  size?: number;
  /** trailing text, e.g. "12 contributors" */
  label?: string;
  className?: string;
}

/**
 * Overlapping contributor stack. Photos are grayscale on the trunk and full
 * color inside a product scope.
 *
 * ```tsx
 * <AvatarGroup people={people} max={4} label="12 contributors" />
 * ```
 */
export function AvatarGroup({
  people = [],
  max = 5,
  size = 28,
  label,
  className = '',
}: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <span
      className={('fl-avatars ' + className).trim()}
      style={{ '--av': size + 'px' } as React.CSSProperties}
    >
      {shown.map((p, i) => (
        <span
          key={p.name + i}
          className="fl-av"
          style={{ '--i': i } as React.CSSProperties}
          title={p.name}
        >
          {p.src ? (
            <img src={p.src} alt={p.name} />
          ) : (
            (p.name || '?').slice(0, 2).toLowerCase()
          )}
        </span>
      ))}
      {rest > 0 && (
        <span
          className="fl-av"
          data-more="true"
          style={{ '--i': shown.length } as React.CSSProperties}
        >
          +{rest}
        </span>
      )}
      {label && <span className="fl-avatars-label">{label}</span>}
    </span>
  );
}
