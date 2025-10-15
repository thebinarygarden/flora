'use client';

import { IconCopy } from '../../icons';

interface ColorTileProps {
  hex: string;
  label?: string;
  showLabel?: boolean;
  showHex?: boolean;
  showCopyIcon?: boolean;
  onClick?: () => void;
  reactOnClick?: boolean;
  className?: string;
  previewClassName?: string;
  variant?: 'card' | 'plain';
}

export function ColorTile({
  hex,
  label,
  showLabel = false,
  showHex = false,
  showCopyIcon = false,
  onClick,
  reactOnClick = false,
  className = '',
  previewClassName = 'w-8 h-8',
  variant = 'card',
}: ColorTileProps) {
  const formatLabel = (text: string) => {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const displayLabel = label ? formatLabel(label) : '';

  // Conditional styling based on variant
  const wrapperClasses =
    variant === 'card'
      ? `w-full flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all hover:scale-105 ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`
      : `w-full flex flex-col items-center ${className}`;

  const wrapperStyle =
    variant === 'card'
      ? {
          borderColor: reactOnClick ? 'var(--success)' : 'var(--border)',
          backgroundColor: 'var(--background)',
          boxShadow: reactOnClick ? '0 0 8px var(--success)' : 'none',
        }
      : {};

  return (
    <button onClick={onClick} className={wrapperClasses} style={wrapperStyle}>
      {/* Color Preview Rectangle */}
      <div
        className={`rounded-lg border-2 ${previewClassName}`}
        style={{
          backgroundColor: hex,
          borderColor: 'var(--border)',
        }}
      />

      {/* Label */}
      {showLabel && displayLabel && (
        <div
          className="text-[10px] font-semibold text-center leading-tight"
          style={{ color: 'var(--on-surface)' }}
        >
          {displayLabel}
        </div>
      )}

      {/* Hex Value with Copy Icon / Copied Indicator */}
      {showHex && (
        <>
          {reactOnClick ? (
            <div
              className="flex items-center justify-center gap-0.5 text-[9px] font-semibold"
              style={{ color: 'var(--success)' }}
            >
              Copied!
            </div>
          ) : (
            <div
              className="flex items-center justify-center gap-0.5 text-[9px] opacity-70"
              style={{ color: 'var(--on-surface)' }}
            >
              {showCopyIcon && <IconCopy size={8} color="currentColor" />}
              <span className="font-mono">{hex}</span>
            </div>
          )}
        </>
      )}
    </button>
  );
}
