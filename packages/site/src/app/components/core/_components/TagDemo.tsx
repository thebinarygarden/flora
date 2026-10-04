'use client';

import { useState } from 'react';
import { Tag } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';

const TOPICS = ['design', 'motion', 'writing', 'dev'];
const REMOVABLE = ['typescript', 'react', 'tailwind'];

export function TagDemo() {
  const [picked, setPicked] = useState<string[]>(['design']);
  const [chips, setChips] = useState(REMOVABLE);

  const toggle = (t: string) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <>
      {TOPICS.map((t) => (
        <Tag key={t} selected={picked.includes(t)} onClick={() => toggle(t)}>
          {t}
        </Tag>
      ))}
      <span style={{ width: '100%' }} />
      {chips.map((t) => (
        <Tag key={t} onRemove={() => setChips((c) => c.filter((x) => x !== t))}>
          {t}
        </Tag>
      ))}
      {chips.length < REMOVABLE.length && (
        <Button size="sm" variant="ghost" onClick={() => setChips(REMOVABLE)}>
          reset
        </Button>
      )}
    </>
  );
}
