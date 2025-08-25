'use client';

import { ComponentType } from 'react';
import { Button } from '@flora/ui/dist/input';
import { CopyableText } from '@flora/ui/dist/display';
import { downloadSVG } from '@/utils/downloadSVG';

interface IconDisplayCardProps {
  name: string;
  component: ComponentType<any>;
  description: string;
  selectedSize: number;
  selectedColor: string;
  selectedStrokeWidth: string;
}

export function IconDisplayCard({ 
  name, 
  component: IconComponent, 
  description, 
  selectedSize, 
  selectedColor, 
  selectedStrokeWidth 
}: IconDisplayCardProps) {
  return (
    <div className="pt-6 p-4 rounded-lg border transition-all" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
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
  );
}