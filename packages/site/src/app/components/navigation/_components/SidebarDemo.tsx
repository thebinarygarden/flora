'use client';

import { useState } from 'react';
import { SidebarNav } from '@binarygarden/flora/navigation';
import { IconInfo, IconSave } from '@binarygarden/flora/icons';

const GROUPS = [
  {
    title: 'foundations',
    items: [
      { id: 'color', label: 'color' },
      { id: 'type', label: 'type' },
      { id: 'spacing', label: 'spacing', badge: 3 },
    ],
  },
  {
    title: 'components',
    items: [
      {
        id: 'core',
        label: 'core',
        icon: <IconInfo size={16} />,
        children: [
          { id: 'buttons', label: 'buttons', badge: 4 },
          { id: 'tags', label: 'tags', badge: 2 },
        ],
      },
      {
        id: 'forms',
        label: 'forms',
        icon: <IconSave size={16} />,
        children: [
          { id: 'inputs', label: 'inputs', badge: 6 },
          { id: 'switches', label: 'switches' },
        ],
      },
    ],
  },
];

export function SidebarDemo() {
  const [current, setCurrent] = useState('buttons');
  return (
    <SidebarNav
      groups={GROUPS}
      current={current}
      onSelect={setCurrent}
      collapsible
    />
  );
}
