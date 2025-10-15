'use client';
import * as React from 'react';
import { IconBGDocs } from '../icons';

export interface CopyableTextProps {
  value: string;
  className?: string;
  label?: string;
}

export const CopyableText: React.FC<CopyableTextProps> = ({
  value,
  className = '',
  label,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 500);
    } catch {
      // Silently fail - user will notice copy didn't work
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--on-surface)' }}
        >
          {label}
        </label>
      )}
      <button
        onClick={handleCopy}
        className="w-full flex items-center gap-3 p-3 rounded border transition-all cursor-pointer group"
        style={{
          backgroundColor: copied ? 'var(--success)' : 'var(--surface-variant)',
          borderColor: copied ? 'var(--success)' : 'var(--border)',
          color: copied ? 'var(--on-success)' : 'var(--on-surface-variant)',
        }}
      >
        <code
          className="flex-1 text-left text-xs font-mono overflow-x-auto no-scrollbar select-all"
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </code>
        <div
          className="flex-shrink-0 transition-transform group-hover:scale-110"
          style={{
            color: copied ? 'var(--on-success)' : 'var(--on-surface)',
          }}
        >
          <IconBGDocs size={16} />
        </div>
      </button>
    </div>
  );
};
