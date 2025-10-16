'use client';

import { Theme, saveTemplate, hexToHSB } from '@binarygarden/flora/theme';
import { UIPreviewCarouselWithNav } from '../../../../components/UIPreviewCarouselWithNav';
import { useRouter } from 'next/navigation';
import { useDialog } from '@binarygarden/flora/overlay';
import { IconPaintBrush, IconX, IconCheck } from '@binarygarden/flora/icons';
import { useHover } from '../../../../utils/useHover';

interface ThemeReviewControlsProps {
  theme: Theme;
  setIsOverlayOpen: (isOpen: boolean) => void;
  templateName?: string;
  compact?: boolean;
  stickyTop?: string;
}

export function ThemeReviewControls({
  theme,
  setIsOverlayOpen,
  templateName,
  compact = false,
  stickyTop = 'top-20',
}: ThemeReviewControlsProps) {
  const router = useRouter();
  const { showPrompt, showAlert } = useDialog();
  const paintbrushHover = useHover();
  const cancelHover = useHover();
  const doneHover = useHover();

  // Shared button styles helper
  const getButtonClasses = () => {
    return compact
      ? 'cursor-pointer p-2 rounded-lg transition-all duration-200'
      : 'cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200';
  };

  // Action buttons to be rendered in the navigation bar
  const actions = compact ? (
    <>
      {/* Paintbrush Icon */}
      <button
        onClick={() => setIsOverlayOpen(true)}
        onMouseEnter={paintbrushHover.handleMouseEnter}
        onMouseLeave={paintbrushHover.handleMouseLeave}
        className={getButtonClasses()}
        style={{
          color: paintbrushHover.isHovered
            ? 'var(--on-tertiary)'
            : 'var(--tertiary)',
          backgroundColor: paintbrushHover.isHovered
            ? 'var(--tertiary)'
            : 'var(--surface)',
          border: paintbrushHover.isHovered
            ? 'none'
            : '1px solid var(--border)',
        }}
        aria-label="Open theme editor"
      >
        <IconPaintBrush size={24} />
      </button>

      {/* Cancel Button */}
      <button
        onClick={() => router.push('/theme')}
        onMouseEnter={cancelHover.handleMouseEnter}
        onMouseLeave={cancelHover.handleMouseLeave}
        className={getButtonClasses()}
        style={{
          color: cancelHover.isHovered ? 'var(--on-error)' : 'var(--error)',
          backgroundColor: cancelHover.isHovered
            ? 'var(--error)'
            : 'var(--surface)',
          border: cancelHover.isHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Cancel"
      >
        <IconX size={24} />
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
        onMouseEnter={doneHover.handleMouseEnter}
        onMouseLeave={doneHover.handleMouseLeave}
        className={getButtonClasses()}
        style={{
          color: doneHover.isHovered ? 'var(--on-primary)' : 'var(--primary)',
          backgroundColor: doneHover.isHovered
            ? 'var(--primary)'
            : 'var(--surface)',
          border: doneHover.isHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Done"
      >
        <IconCheck size={24} />
      </button>
    </>
  ) : (
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
        onMouseEnter={paintbrushHover.handleMouseEnter}
        onMouseLeave={paintbrushHover.handleMouseLeave}
        className={getButtonClasses()}
        style={{
          color: paintbrushHover.isHovered
            ? 'var(--on-tertiary)'
            : 'var(--tertiary)',
          backgroundColor: paintbrushHover.isHovered
            ? 'var(--tertiary)'
            : 'var(--surface)',
          border: paintbrushHover.isHovered
            ? 'none'
            : '1px solid var(--border)',
        }}
        aria-label="Open theme editor"
      >
        <IconPaintBrush size={24} />
      </button>

      {/* Cancel Button */}
      <button
        onClick={() => router.push('/theme')}
        onMouseEnter={cancelHover.handleMouseEnter}
        onMouseLeave={cancelHover.handleMouseLeave}
        className={getButtonClasses()}
        style={{
          color: cancelHover.isHovered ? 'var(--on-error)' : 'var(--error)',
          backgroundColor: cancelHover.isHovered
            ? 'var(--error)'
            : 'var(--surface)',
          border: cancelHover.isHovered ? 'none' : '1px solid var(--border)',
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
        onMouseEnter={doneHover.handleMouseEnter}
        onMouseLeave={doneHover.handleMouseLeave}
        className={getButtonClasses()}
        style={{
          color: doneHover.isHovered ? 'var(--on-primary)' : 'var(--primary)',
          backgroundColor: doneHover.isHovered
            ? 'var(--primary)'
            : 'var(--surface)',
          border: doneHover.isHovered ? 'none' : '1px solid var(--border)',
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
      compactLayout={compact}
      stickyTop={stickyTop}
    />
  );
}
