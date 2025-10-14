"use client";
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
  label
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 500);
    } catch (err) {
      // Silently fail - user will notice copy didn't work
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <textarea
          value={value}
          readOnly
          rows={1}
          className="flex-1 p-3 rounded text-xs font-mono border resize-none no-scrollbar"
          style={{ 
            backgroundColor: 'var(--background)', 
            color: 'var(--on-background)',
            borderColor: 'var(--border)',
            whiteSpace: 'nowrap',
            overflowX: 'auto'
          }}
        />
        <button
          onClick={handleCopy}
          className="p-2 rounded border transition-colors cursor-pointer"
          style={{ 
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: copied ? 'var(--success, #10B981)' : 'var(--on-surface)'
          }}
        >
          <IconBGDocs size={16} />
        </button>
      </div>
    </div>
  );
};