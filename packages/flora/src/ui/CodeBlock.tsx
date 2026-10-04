'use client';

import * as React from 'react';

export interface CodeBlockProps {
  code: string;
  /** shown faint in the header */
  language?: string;
  /** filename or step label */
  title?: string;
  lines?: boolean;
  copy?: boolean;
  className?: string;
}

/**
 * Sunken monospace block with an optional filename header, line numbers and a
 * copy button that flashes the accent. For a single inline value, use
 * CopyableText instead.
 *
 * ```tsx
 * <CodeBlock title="terminal" language="sh" code="npm i @binarygarden/flora" />
 * ```
 */
export function CodeBlock({
  code = '',
  language,
  title,
  lines = false,
  copy = true,
  className = '',
}: CodeBlockProps) {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1200);
    return () => clearTimeout(t);
  }, [done]);

  const onCopy = () => {
    try {
      navigator.clipboard.writeText(code);
    } catch {
      // clipboard blocked; the flash is still a useful acknowledgement
    }
    setDone(true);
  };

  const hasHead = !!(title || language);
  const rows = code.replace(/\n$/, '').split('\n');
  const copyButton = copy && (
    <button className="fl-code-copy" data-done={done} onClick={onCopy}>
      {done ? 'copied' : 'copy'}
    </button>
  );

  return (
    <div
      className={('fl-code ' + className).trim()}
      data-lines={lines}
      data-head={hasHead}
    >
      {hasHead ? (
        <div className="fl-code-head">
          {title && <span>{title}</span>}
          {language && <span className="fl-code-lang">{language}</span>}
          {copyButton}
        </div>
      ) : (
        copyButton
      )}
      <pre>{lines ? rows.map((r, i) => <span key={i}>{r}</span>) : code}</pre>
    </div>
  );
}
