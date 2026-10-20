'use client';

import { useState } from 'react';
import { Tag } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';

const REMOVABLE = ['typescript', 'react', 'tailwind'];

export function TagDemo({
  topics,
  reset,
  labels,
}: {
  topics: string[];
  reset: string;
  labels: { remove: string };
}) {
  const [picked, setPicked] = useState<string[]>([topics[0]]);
  const [chips, setChips] = useState(REMOVABLE);

  const toggle = (t: string) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <>
      {topics.map((t) => (
        <Tag key={t} selected={picked.includes(t)} onClick={() => toggle(t)}>
          {t}
        </Tag>
      ))}
      <span style={{ width: '100%' }} />
      {chips.map((t) => (
        <Tag
          key={t}
          onRemove={() => setChips((c) => c.filter((x) => x !== t))}
          labels={labels}
        >
          {t}
        </Tag>
      ))}
      {chips.length < REMOVABLE.length && (
        <Button size="sm" variant="ghost" onClick={() => setChips(REMOVABLE)}>
          {reset}
        </Button>
      )}
    </>
  );
}
