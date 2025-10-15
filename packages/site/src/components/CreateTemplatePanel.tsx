'use client';

import { Button } from '@binarygarden/flora/form';
import { IconPlus } from '@binarygarden/flora/icons';

interface CreateTemplatePanelProps {
  onCreateNew: () => void;
}

export function CreateTemplatePanel({ onCreateNew }: CreateTemplatePanelProps) {
  return (
    <div
      className="flex items-stretch"
      style={{ minWidth: '280px', maxWidth: '400px' }}
    >
      <Button
        variant="dashed"
        icon={<IconPlus size={64} color="var(--primary)" />}
        subtitle="Design a custom theme"
        onClick={onCreateNew}
        className="w-full h-full flex-1"
      >
        Create New Template
      </Button>
    </div>
  );
}
