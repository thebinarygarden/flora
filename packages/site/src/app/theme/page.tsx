'use client';

import { useState } from 'react';
import { TemplateGallery, loadTemplates, deleteTemplate } from '@binarygarden/flora/theme';
import { HuePicker } from '@binarygarden/flora/form';
import { useRouter } from 'next/navigation';

export default function ThemePage() {
  const router = useRouter();
  const [selectedHue, setSelectedHue] = useState(0);
  const [selectedHex, setSelectedHex] = useState('#ff0000');

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Theme Templates</h1>
          <p className="text-lg opacity-70">
            Create and manage your custom theme templates
          </p>
        </div>

        {/* Seed Hue Selector */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-3">Template Preview Seed</h3>
          <p className="text-sm opacity-70 mb-6">
            Move the hue slider to see all templates below rehydrate with different seed colors
          </p>
          <div className="max-w-xl">
            <HuePicker
              initialHue={selectedHue}
              onChangeHue={setSelectedHue}
              onChangeHex={setSelectedHex}
              className="mb-4"
            />
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-medium" style={{ color: 'var(--on-surface)' }}>Seed Hue: </span>
                <span style={{ color: 'var(--on-surface)' }}>{selectedHue}°</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium" style={{ color: 'var(--on-surface)' }}>Pure Color: </span>
                <div
                  className="w-6 h-6 rounded border-2"
                  style={{
                    backgroundColor: selectedHex,
                    borderColor: 'var(--border)'
                  }}
                />
                <span className="font-mono" style={{ color: 'var(--on-surface)' }}>{selectedHex}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Template Gallery - Client Component */}
        <TemplateGallery
          loadTemplates={loadTemplates}
          deleteTemplate={deleteTemplate}
          onCreateNew={() => router.push('/theme/creator')}
          hydrationSeedHue={selectedHue}
        />
      </div>
    </div>
  );
}