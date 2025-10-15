'use client';

import { useState, CSSProperties, ReactNode } from 'react';
import { Theme } from '@binarygarden/flora/theme';
import {
  UIPreviewCarousel,
  previews,
} from '../app/theme/creator/_components/previews/UIPreviewCarousel';
import { IconArrow } from '@binarygarden/flora/icons';
import { useHover } from '../utils/useHover';

interface UIPreviewCarouselWithNavProps {
  theme: Theme;
  title?: string;
  description?: string;
  actions?: ReactNode;
  stickyNav?: boolean;
  compactLayout?: boolean;
  stickyTop?: string;
}

export function UIPreviewCarouselWithNav({
  theme,
  title,
  description,
  actions,
  stickyNav = false,
  compactLayout = false,
  stickyTop = 'top-20',
}: UIPreviewCarouselWithNavProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const leftHover = useHover();
  const rightHover = useHover();

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? previews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === previews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentPreview = previews[currentIndex];

  // Convert theme object to CSS custom properties
  const themeStyles = {
    '--primary': theme.primary,
    '--on-primary': theme.onPrimary,
    '--secondary': theme.secondary,
    '--on-secondary': theme.onSecondary,
    '--tertiary': theme.tertiary,
    '--on-tertiary': theme.onTertiary,
    '--background': theme.background,
    '--on-background': theme.onBackground,
    '--surface': theme.surface,
    '--on-surface': theme.onSurface,
    '--surface-variant': theme.surfaceVariant,
    '--on-surface-variant': theme.onSurfaceVariant,
    '--border': theme.border,
    '--hover': theme.hover,
    '--focus': theme.focus,
    '--disabled': theme.disabled,
    '--on-disabled': theme.onDisabled,
    '--link': theme.link,
    '--on-link': theme.onLink,
    '--error': theme.error,
    '--on-error': theme.onError,
    '--success': theme.success,
    '--on-success': theme.onSuccess,
    '--warning': theme.warning,
    '--on-warning': theme.onWarning,
    '--info': theme.info,
    '--on-info': theme.onInfo,
    '--neutral': theme.neutral,
    '--on-neutral': theme.onNeutral,
    '--highlight': theme.highlight,
    '--on-highlight': theme.onHighlight,
  } as CSSProperties;

  // Reusable navigation components
  const dotsIndicator = (
    <div className="flex gap-2">
      {previews.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className="transition-all duration-300"
          style={{
            width: currentIndex === index ? '32px' : '8px',
            height: '8px',
            borderRadius: '4px',
            backgroundColor:
              currentIndex === index ? 'var(--primary)' : 'var(--border)',
            cursor: 'pointer',
          }}
          aria-label={`Go to ${previews[index].title}`}
        />
      ))}
    </div>
  );

  const navigationArrows = (
    <div className="flex gap-2">
      <button
        onClick={goToPrevious}
        onMouseEnter={leftHover.handleMouseEnter}
        onMouseLeave={leftHover.handleMouseLeave}
        className="cursor-pointer p-2 rounded-lg transition-all duration-200"
        style={{
          color: leftHover.isHovered
            ? 'var(--on-secondary)'
            : 'var(--secondary)',
          backgroundColor: leftHover.isHovered
            ? 'var(--secondary)'
            : 'var(--surface)',
          border: leftHover.isHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Previous preview"
      >
        <IconArrow size={24} orientation="left" />
      </button>
      <button
        onClick={goToNext}
        onMouseEnter={rightHover.handleMouseEnter}
        onMouseLeave={rightHover.handleMouseLeave}
        className="cursor-pointer p-2 rounded-lg transition-all duration-200"
        style={{
          color: rightHover.isHovered
            ? 'var(--on-secondary)'
            : 'var(--secondary)',
          backgroundColor: rightHover.isHovered
            ? 'var(--secondary)'
            : 'var(--surface)',
          border: rightHover.isHovered ? 'none' : '1px solid var(--border)',
        }}
        aria-label="Next preview"
      >
        <IconArrow size={24} orientation="right" />
      </button>
    </div>
  );

  const previewTitle = (
    <h3
      className="text-lg font-semibold"
      style={{ color: 'var(--on-background)' }}
    >
      {currentPreview.title}
    </h3>
  );

  // Regular layout: title | (dots + arrows)
  const regularNavControls = (
    <>
      {previewTitle}
      <div className="flex items-center gap-3">
        {dotsIndicator}
        {navigationArrows}
      </div>
    </>
  );

  // Compact layout: (title + dots stacked) | arrows | actions
  const compactNavControls = (
    <>
      <div className="flex flex-col gap-2 flex-1">
        {previewTitle}
        {dotsIndicator}
      </div>
      {navigationArrows}
      {actions && (
        <>
          <div
            style={{
              height: '40px',
              width: '2px',
              backgroundColor: 'var(--on-surface)',
              opacity: 0.3,
            }}
          />
          {actions}
        </>
      )}
    </>
  );

  return (
    <div
      className="p-4 rounded-xl"
      style={{ ...themeStyles, backgroundColor: 'var(--background)' }}
    >
      <div className="mb-12">
        {title && (
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--on-background)' }}
            >
              {title}
            </h2>
            {description && (
              <p
                className="text-lg opacity-70"
                style={{ color: 'var(--on-background)' }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className="space-y-6">
          {/* Navigation Header */}
          {compactLayout ? (
            /* Compact Layout: Everything in one bar */
            <div
              className={`flex items-center gap-3 py-3 px-4 rounded-2xl ${stickyNav ? `sticky ${stickyTop} z-10 backdrop-blur-md shadow-lg` : ''}`}
              style={{ backgroundColor: 'var(--surface)' }}
            >
              {compactNavControls}
            </div>
          ) : (
            /* Regular Layout: Split navigation and actions */
            <div
              className={`flex items-center gap-3 ${stickyNav ? `sticky ${stickyTop} z-10` : ''}`}
            >
              {actions ? (
                <>
                  {/* Left Section: Navigation Controls */}
                  <div
                    className={`flex-1 flex items-center justify-between gap-4 py-3 px-4 rounded-2xl ${stickyNav ? 'backdrop-blur-md shadow-lg' : ''}`}
                    style={{ backgroundColor: 'var(--surface)' }}
                  >
                    {regularNavControls}
                  </div>
                  {/* Right Section: Custom Actions */}
                  {actions}
                </>
              ) : (
                /* Single Section: Navigation Only */
                <div
                  className={`flex items-center justify-between gap-4 py-3 px-4 rounded-2xl w-full ${stickyNav ? 'backdrop-blur-md shadow-lg' : ''}`}
                  style={{ backgroundColor: 'var(--surface)' }}
                >
                  {regularNavControls}
                </div>
              )}
            </div>
          )}

          {/* Preview Content */}
          <div>
            <UIPreviewCarousel currentIndex={currentIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export for use in refactored components
export { previews };
