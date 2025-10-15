'use client';

import { useState } from 'react';
import {
  IconInfo,
  IconGithub,
  IconYoutube,
  IconBGDocs,
  IconBGLogo,
  IconCheck,
  IconNight,
  IconDay,
  IconContact,
  IconArrow,
  IconHide,
  IconView,
  IconLinkOut,
  IconLock,
  IconUnlock,
  IconSearch,
  IconCopy,
  IconMenu,
  IconMinus,
  IconX,
  IconPlus,
  IconEyeDropper,
  IconPaintBrush,
  IconSave,
  IconTrashcan,
  type StrokeWidth,
} from '@binarygarden/flora/icons';
import { IconSizeSelector } from './IconSizeSelector';
import { IconStrokeWidthSelector } from './IconStrokeWidthSelector';
import { IconColorPicker } from './IconColorPicker';
import { IconDisplayCard } from './IconDisplayCard';

const icons = [
  { name: 'Arrow', component: IconArrow, description: 'Directional arrow' },
  {
    name: 'BGDocs',
    component: IconBGDocs,
    description: 'Binary Garden Documentation icon',
  },
  { name: 'BGLogo', component: IconBGLogo, description: 'Binary Garden logo' },
  { name: 'Check', component: IconCheck, description: 'Check/confirm mark' },
  {
    name: 'Contact',
    component: IconContact,
    description: 'Contact/communication',
  },
  { name: 'Copy', component: IconCopy, description: 'Copy to clipboard' },
  { name: 'Day', component: IconDay, description: 'Light mode indicator' },
  {
    name: 'EyeDropper',
    component: IconEyeDropper,
    description: 'Color picker tool',
  },
  { name: 'Github', component: IconGithub, description: 'GitHub logo' },
  {
    name: 'Hide',
    component: IconHide,
    description: 'Hide/eye closed indicator',
  },
  { name: 'Info', component: IconInfo, description: 'Information indicator' },
  {
    name: 'LinkOut',
    component: IconLinkOut,
    description: 'External link indicator',
  },
  { name: 'Lock', component: IconLock, description: 'Security/locked state' },
  { name: 'Menu', component: IconMenu, description: 'Navigation menu' },
  { name: 'Minus', component: IconMinus, description: 'Remove/minus sign' },
  { name: 'Night', component: IconNight, description: 'Dark mode indicator' },
  {
    name: 'PaintBrush',
    component: IconPaintBrush,
    description: 'Paint/drawing tool',
  },
  { name: 'Plus', component: IconPlus, description: 'Add/plus sign' },
  { name: 'Save', component: IconSave, description: 'Save/disk icon' },
  {
    name: 'Search',
    component: IconSearch,
    description: 'Search functionality',
  },
  {
    name: 'Trashcan',
    component: IconTrashcan,
    description: 'Delete/trash icon',
  },
  {
    name: 'Unlock',
    component: IconUnlock,
    description: 'Security/unlocked state',
  },
  { name: 'View', component: IconView, description: 'View/eye open indicator' },
  { name: 'X', component: IconX, description: 'Close/dismiss' },
  { name: 'Youtube', component: IconYoutube, description: 'YouTube logo' },
];

const defaultColorOptions = [
  'currentColor',
  '#3B82F6',
  '#EF4444',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
];

export function IconsInteractiveSection() {
  const [selectedStrokeWidth, setSelectedStrokeWidth] =
    useState<StrokeWidth>('base');
  const [selectedSize, setSelectedSize] = useState(35);
  const [selectedColor, setSelectedColor] = useState('currentColor');
  const [customColors, setCustomColors] = useState(defaultColorOptions);

  const handleAddCustomColor = (color: string) => {
    if (!customColors.includes(color)) {
      setCustomColors([...customColors, color]);
    }
  };

  return (
    <>
      {/* Icon Properties */}
      <section className="mb-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Icon Properties</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <IconSizeSelector
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />

          <IconStrokeWidthSelector
            selectedStrokeWidth={selectedStrokeWidth}
            onStrokeWidthChange={setSelectedStrokeWidth}
          />

          <IconColorPicker
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            customColors={customColors}
            onAddCustomColor={handleAddCustomColor}
          />
        </div>
      </section>

      {/* Icons Grid */}
      <section>
        <h2
          className="text-2xl font-semibold mb-6"
          style={{ color: 'var(--on-background)' }}
        >
          Available Icons
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {icons.map(({ name, component, description }) => (
            <IconDisplayCard
              key={name}
              name={name}
              component={component}
              description={description}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedStrokeWidth={selectedStrokeWidth}
            />
          ))}
        </div>
      </section>
    </>
  );
}
