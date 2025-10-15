'use client';

import { useState } from 'react';
import { Theme, saveTemplate, hexToHSB } from '@binarygarden/flora/theme';
import { UIPreviewCarouselWithNav } from '../../../../components/UIPreviewCarouselWithNav';
import { useRouter } from 'next/navigation';
import { useDialog } from '@binarygarden/flora/overlay';
import { IconPaintBrush, IconX, IconCheck } from '@binarygarden/flora/icons';

interface ThemeReviewControlsProps {
  theme: Theme;
  setIsOverlayOpen: (isOpen: boolean) => void;
  templateName?: string;
}

export function ThemeReviewControls({
  theme,
  setIsOverlayOpen,
  templateName,
}: ThemeReviewControlsProps) {
  const router = useRouter();
  const { showPrompt, showAlert } = useDialog();
  const [isPaintbrushHovered, setIsPaintbrushHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isDoneHovered, setIsDoneHovered] = useState(false);

  // Action buttons to be rendered in the navigation bar
  const actions = (
    <div
      className="flex items-center gap-3 py-3 px-4 rounded-2xl"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Divider */}
      <div
        style={{
          height: '40px',
          width: '1px',
          backgroundColor: 'var(--border)',
        }}
      />

      {/* Paintbrush Icon */}
      <button
        onClick={() => setIsOverlayOpen(true)}
        onMouseEnter={() => setIsPaintbrushHovered(true)}
        onMouseLeave={() => setIsPaintbrushHovered(false)}
        className="cursor-pointer p-2 rounded-lg transition-all duration-200"
        style={{
          color: isPaintbrushHovered ? 'var(--on-tertiary)' : 'var(--tertiary)',
          backgroundColor: isPaintbrushHovered
            ? 'var(--tertiary)'
            : 'var(--surface)',
          border: isPaintbrushHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Open theme editor"
      >
        <IconPaintBrush size={24} />
      </button>

      {/* Cancel Button */}
      <button
        onClick={() => router.push('/theme')}
        onMouseEnter={() => setIsCancelHovered(true)}
        onMouseLeave={() => setIsCancelHovered(false)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
        style={{
          color: isCancelHovered ? 'var(--on-error)' : 'var(--error)',
          backgroundColor: isCancelHovered ? 'var(--error)' : 'var(--surface)',
          border: isCancelHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Cancel"
      >
        <IconX size={24} />
        <span className="font-medium">Cancel</span>
      </button>

      {/* Done Button */}
      <button
        onClick={() => {
          showPrompt(
            'Enter a name for this theme template:',
            (name) => {
              try {
                // Extract hue from primary color with max saturation and brightness
                const primaryHSB = hexToHSB(theme.primary);
                const seedHue = primaryHSB.hue;
                saveTemplate(theme, name, seedHue);
                router.push('/theme');
              } catch {
                showAlert('Error saving template. Please try again.');
              }
            },
            templateName ?? ''
          );
        }}
        onMouseEnter={() => setIsDoneHovered(true)}
        onMouseLeave={() => setIsDoneHovered(false)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
        style={{
          color: isDoneHovered ? 'var(--on-primary)' : 'var(--primary)',
          backgroundColor: isDoneHovered ? 'var(--primary)' : 'var(--surface)',
          border: isDoneHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Done"
      >
        <IconCheck size={24} />
        <span className="font-semibold">Done</span>
      </button>
    </div>
  );

  return (
    <UIPreviewCarouselWithNav
      theme={theme}
      title="Theme Review"
      description="Review your theme across different interfaces to ensure everything looks correct before saving"
      actions={actions}
      stickyNav={true}
    />
  );
}
