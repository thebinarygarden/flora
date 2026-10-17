'use client';

import * as React from 'react';
import { IconCopy } from '../icons/IconCopy';

const copyableTextLabels = {
  /** read before the field label: copy client id */
  copy: 'copy',
  copied: 'copied',
  /** stands in for the field label when there is none */
  value: 'value',
};

export type CopyableTextLabels = typeof copyableTextLabels;

export interface CopyableTextProps {
  value: string;
  label?: string;
  className?: string;
  labels?: Partial<CopyableTextLabels>;
}

/**
 * A single value in mono type that copies on click — an id, a token, a secret.
 * For multi-line code use CodeBlock.
 *
 * ```tsx
 * <CopyableText label="client id" value={clientId} />
 * ```
 */
export function CopyableText({
  value,
  label,
  className = '',
  labels,
}: CopyableTextProps) {
  const l = { ...copyableTextLabels, ...labels };
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const onCopy = () => {
    try {
      navigator.clipboard.writeText(value);
    } catch {
      // clipboard blocked; the flash is still a useful acknowledgement
    }
    setCopied(true);
  };

  return (
    <div className={('fl-copy ' + className).trim()}>
      {label && <span className="fl-label">{label}</span>}
      <button
        type="button"
        className="fl-copy-btn"
        data-done={copied}
        onClick={onCopy}
        aria-label={copied ? l.copied : l.copy + ' ' + (label || l.value)}
      >
        <code>{value}</code>
        <IconCopy size={16} />
      </button>
    </div>
  );
}
