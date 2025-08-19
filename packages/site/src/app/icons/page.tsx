"use client";

import { useState } from 'react';
import {
  IconInfo,
  IconGithub,
  IconYoutube,
  IconBGDocs,
  IconBGLogo,
  IconNight,
  IconDay,
  IconContact,
  IconArrow,
  IconHide,
  IconView,
  IconLinkOut,
  IconSearch,
} from '@flora/ui/icons';
import { Button, HSBColorPicker } from '@flora/ui/input';
import { CopyableText } from '@flora/ui/display';
import { useTheme } from '@flora/ui/theme';
import { downloadSVG } from '@/utils/downloadSVG';

const icons = [
  { name: 'Info', component: IconInfo, description: 'Information indicator'},
  { name: 'Github', component: IconGithub, description: 'GitHub logo' },
  { name: 'Youtube', component: IconYoutube, description: 'YouTube logo' },
  { name: 'BGDocs', component: IconBGDocs, description: 'Binary Garden Documentation icon' },
  { name: 'BGLogo', component: IconBGLogo, description: 'Binary Garden logo' },
  { name: 'Night', component: IconNight, description: 'Dark mode indicator' },
  { name: 'Day', component: IconDay, description: 'Light mode indicator' },
  { name: 'Contact', component: IconContact, description: 'Contact/communication' },
  { name: 'Arrow', component: IconArrow, description: 'Directional arrow' },
  { name: 'Hide', component: IconHide, description: 'Hide/eye closed indicator' },
  { name: 'View', component: IconView, description: 'View/eye open indicator' },
  { name: 'LinkOut', component: IconLinkOut, description: 'External link indicator' },
  { name: 'Search', component: IconSearch, description: 'Search functionality' },
];

const strokeWidthOptions = ['thinnest', 'thinner', 'thin', 'base', 'bold', 'bolder', 'boldest', 'rotund'] as const;
const strokeWidthValues = {
  thinnest: 20,
  thinner: 25,
  thin: 30,
  base: 35,
  bold: 40,
  bolder: 45,
  boldest: 50,
  rotund: 55
};
const sizeOptions = [12, 18, 24, 30, 36, 42, 48, 60, 72, 84, 96];
const defaultColorOptions = ['currentColor', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function IconsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [selectedStrokeWidth, setSelectedStrokeWidth] = useState<typeof strokeWidthOptions[number]>('base');
  const [selectedSize, setSelectedSize] = useState(35);
  const [selectedColor, setSelectedColor] = useState('currentColor');
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);
  const [customColors, setCustomColors] = useState(defaultColorOptions);
  const [pickerColor, setPickerColor] = useState('');

  const handlePickerColorChange = (hex: string) => {
    setPickerColor(hex);
  };

  const saveCustomColor = () => {
    // Add color to collection if it doesn't already exist
    if (!customColors.includes(pickerColor)) {
      setCustomColors([...customColors, pickerColor]);
    }
    // Select the saved color
    setSelectedColor(pickerColor);
    // Close the picker
    setShowCustomColorPicker(false);
  };

  const cancelColorPicker = () => {
    // Reset picker color to default for next time
    setPickerColor('');
    // Close the picker
    setShowCustomColorPicker(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)' }}>
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--on-background)' }}>Flora Icons</h1>
          <button
            onClick={toggleTheme}
            className="ml-auto p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
          >
            {isDark ? <IconDay size={20} /> : <IconNight size={20} />}
          </button>
        </div>
        <p className="text-xl leading-relaxed" style={{ color: 'var(--on-background)', opacity: 0.8 }}>
          SVG icon collection with customizable properties for modern applications
        </p>
      </header>

      <section className="mb-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Icon Properties</h2>

        {/*Pixel Size*/}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'primary' : 'outline'}
                  onClick={() => setSelectedSize(size)}
                  className="text-sm px-3 py-1"
                >
                  {size}px
                </Button>
              ))}
            </div>
          </div>

          {/*Strike Width*/}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>Stroke Width</h3>
            <div className="grid grid-cols-2 gap-2">
              {strokeWidthOptions.map((width) => (
                <Button
                  key={width}
                  variant={selectedStrokeWidth === width ? 'primary' : 'outline'}
                  onClick={() => setSelectedStrokeWidth(width)}
                  className="text-xs px-2 py-1"
                >
                  {width} ({strokeWidthValues[width]}px)
                </Button>
              ))}
            </div>
          </div>

          {/*Color*/}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>Color</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {customColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setShowCustomColorPicker(false);
                    }}
                    className={`w-8 h-8 rounded border-2 transition-all ${
                      selectedColor === color && !showCustomColorPicker ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: color
                    }}
                  />
                ))}

                <button
                  onClick={() => setShowCustomColorPicker(!showCustomColorPicker)}
                  className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold border-gray-300`}
                  style={{
                    backgroundColor: showCustomColorPicker ? pickerColor : 'var(--surface)',
                    color: 'var(--on-background)'
                  }}
                >
                  {!showCustomColorPicker && ('+')}
                </button>
              </div>

              {showCustomColorPicker && (
                <div className="mt-4 space-y-4">
                  <HSBColorPicker
                    onChangeHex={handlePickerColorChange}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={saveCustomColor}
                      className="flex-1"
                    >
                      Save Color
                    </Button>
                    <Button
                      variant="outline"
                      onClick={cancelColorPicker}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--on-background)' }}>Available Icons</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {icons.map(({ name, component: IconComponent, description }) => (
            <div key={name} className="pt-6 p-4 rounded-lg border transition-all" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-center mb-4 h-20">
                <IconComponent
                  size={selectedSize}
                  color={selectedColor}
                  strokeWidth={selectedStrokeWidth}
                />
              </div>

              <h3 className="font-semibold text-lg mb-2 text-center" style={{ color: 'var(--on-surface)' }}>{name}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--on-surface)', opacity: 0.7 }}>{description}</p>

              <div className="space-y-2">
                <CopyableText
                  value={`<Icon${name} size={${selectedSize}} color="${selectedColor}" strokeWidth="${selectedStrokeWidth}" />`}
                />

                <Button
                  variant="outline"
                  onClick={() => downloadSVG(name, IconComponent, selectedSize, selectedColor, selectedStrokeWidth)}
                  className="w-full text-sm flex items-center justify-center gap-2"
                >
                  Download SVG
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}