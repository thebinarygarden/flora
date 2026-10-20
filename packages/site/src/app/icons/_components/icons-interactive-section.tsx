'use client';

import { useState } from 'react';
import {
  IconAccount,
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
  IconSystem,
  IconCopy,
  IconMenu,
  IconMinus,
  IconX,
  IconPlus,
  IconEyeDropper,
  IconPaintBrush,
  IconSave,
  IconTrashcan,
  IconApple,
  IconWindows,
  IconLinux,
  IconTorta,
  IconFlora,
  type StrokeWidth,
} from '@binarygarden/flora/icons';
import { IconSizeSelector } from './icon-size-selector';
import { IconStrokeWidthSelector } from './icon-stroke-width-selector';
import { IconColorPicker } from './icon-color-picker';
import { IconDisplayCard } from './icon-display-card';
import type { Dict } from '@/lib/i18n';

const icons = [
  { name: 'Account', component: IconAccount },
  { name: 'Apple', component: IconApple },
  { name: 'Arrow', component: IconArrow },
  { name: 'BGDocs', component: IconBGDocs },
  { name: 'BGLogo', component: IconBGLogo },
  { name: 'Check', component: IconCheck },
  { name: 'Contact', component: IconContact },
  { name: 'Copy', component: IconCopy },
  { name: 'Day', component: IconDay },
  { name: 'EyeDropper', component: IconEyeDropper },
  { name: 'Flora', component: IconFlora },
  { name: 'Github', component: IconGithub },
  { name: 'Hide', component: IconHide },
  { name: 'Info', component: IconInfo },
  { name: 'LinkOut', component: IconLinkOut },
  { name: 'Linux', component: IconLinux },
  { name: 'Lock', component: IconLock },
  { name: 'Menu', component: IconMenu },
  { name: 'Minus', component: IconMinus },
  { name: 'Night', component: IconNight },
  { name: 'PaintBrush', component: IconPaintBrush },
  { name: 'Plus', component: IconPlus },
  { name: 'Save', component: IconSave },
  { name: 'Search', component: IconSearch },
  { name: 'System', component: IconSystem },
  { name: 'Torta', component: IconTorta },
  { name: 'Trashcan', component: IconTrashcan },
  { name: 'Unlock', component: IconUnlock },
  { name: 'View', component: IconView },
  { name: 'Windows', component: IconWindows },
  { name: 'X', component: IconX },
  { name: 'Youtube', component: IconYoutube },
] as const;

export function IconsInteractiveSection({
  t,
  copy,
}: {
  t: Dict['icons'];
  copy: Dict['flora']['copy'];
}) {
  const [selectedStrokeWidth, setSelectedStrokeWidth] =
    useState<StrokeWidth>('base');
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedColor, setSelectedColor] = useState('currentColor');

  return (
    <>
      <section className="section">
        <h2>{t.properties}</h2>
        <div className="icon-props">
          <IconSizeSelector
            label={t.size}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
          <IconStrokeWidthSelector
            t={t}
            selectedStrokeWidth={selectedStrokeWidth}
            onStrokeWidthChange={setSelectedStrokeWidth}
          />
          <IconColorPicker
            label={t.color}
            ariaLabel={t.iconColor}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        </div>
      </section>

      <section className="section">
        <h2>{t.set}</h2>
        <div className="grid-auto">
          {icons.map(({ name, component }) => (
            <IconDisplayCard
              key={name}
              name={name}
              component={component}
              description={t.descriptions[name]}
              download={t.download}
              copy={copy}
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
