'use client';

import { ComponentType } from 'react';
import { Button } from '@binarygarden/flora/form';
import { Card, CopyableText } from '@binarygarden/flora/ui';
import { type StrokeWidth } from '@binarygarden/flora/icons';
import { downloadSVG } from '@/app/icons/_hooks/downloadSVG';

interface IconDisplayCardProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  description: string;
  selectedSize: number;
  selectedColor: string;
  selectedStrokeWidth: StrokeWidth;
}

export function IconDisplayCard({
  name,
  component: IconComponent,
  description,
  selectedSize,
  selectedColor,
  selectedStrokeWidth,
}: IconDisplayCardProps) {
  return (
    <Card padding="sm">
      <div className="col" style={{ gap: 'var(--space-3)' }}>
        <div className="icon-stage">
          <IconComponent
            size={selectedSize}
            color={selectedColor}
            strokeWidth={selectedStrokeWidth}
          />
        </div>
        <div>
          <div
            style={{
              font: 'var(--type-body)',
              fontWeight: 'var(--weight-medium)',
            }}
          >
            Icon{name}
          </div>
          <div
            style={{ font: 'var(--type-small)', color: 'var(--text-muted)' }}
          >
            {description}
          </div>
        </div>
        <CopyableText value={`<Icon${name} size={${selectedSize}} />`} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            downloadSVG(
              name,
              IconComponent,
              selectedSize,
              selectedColor,
              selectedStrokeWidth
            )
          }
        >
          download svg
        </Button>
      </div>
    </Card>
  );
}
