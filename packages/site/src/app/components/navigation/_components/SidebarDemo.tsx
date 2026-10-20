'use client';

import { useState } from 'react';
import { SidebarNav } from '@binarygarden/flora/navigation';
import { IconInfo, IconSave } from '@binarygarden/flora/icons';
import type { Dict } from '@/lib/i18n';

const groups = (t: Dict['navigation']['sidebarItems']) => [
  {
    title: t.foundations,
    items: [
      { id: 'color', label: t.color },
      { id: 'type', label: t.type },
      { id: 'spacing', label: t.spacing, badge: 3 },
    ],
  },
  {
    title: t.components,
    items: [
      {
        id: 'core',
        label: t.core,
        icon: <IconInfo size={16} />,
        children: [
          { id: 'buttons', label: t.buttons, badge: 4 },
          { id: 'tags', label: t.tags, badge: 2 },
        ],
      },
      {
        id: 'forms',
        label: t.forms,
        icon: <IconSave size={16} />,
        children: [
          { id: 'inputs', label: t.inputs, badge: 6 },
          { id: 'switches', label: t.switches },
        ],
      },
    ],
  },
];

export function SidebarDemo({
  t,
  labels,
}: {
  t: Dict['navigation']['sidebarItems'];
  labels: Dict['flora']['sidebar'];
}) {
  const [current, setCurrent] = useState('buttons');
  return (
    <SidebarNav
      groups={groups(t)}
      labels={labels}
      current={current}
      onSelect={setCurrent}
      collapsible
    />
  );
}
