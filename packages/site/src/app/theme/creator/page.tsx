'use client';

import {
  useState,
  useRef,
  createRef,
  useEffect,
  CSSProperties,
  RefObject,
  Suspense,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { FullScreenOverlay } from '@binarygarden/flora/overlay';
import {
  Theme,
  useTheme,
  ColorPickerDropdown,
  getTemplateById,
  templateToTheme,
} from '@binarygarden/flora/theme';
import { SurfaceHierarchySection } from './_components/sections/SurfaceHierarchySection';
import { BrandColorsSection } from './_components/sections/BrandColorsSection';
import { InteractiveStatesSection } from './_components/sections/InteractiveStatesSection';
import { SemanticStatesSection } from './_components/sections/SemanticStatesSection';
import { ThemeReviewControls } from './_components/ThemeReviewControls';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function ThemeCreatorContent() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { theme: currentTheme } = useTheme();
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1024;
  const searchParams = useSearchParams();

  // Get template name from URL params for pre-filling save dialog
  const getTemplateName = (): string | undefined => {
    const templateId = searchParams.get('templateId');
    if (templateId) {
      const template = getTemplateById(templateId);
      return template?.name;
    }
    return undefined;
  };

  // Get initial theme from URL params or current theme
  const getInitialTheme = (): Theme => {
    const templateId = searchParams.get('templateId');
    const seedHue = searchParams.get('seedHue');

    // If we have a template ID, load and hydrate it
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        const hydrationSeed = {
          hue: seedHue ? parseInt(seedHue, 10) : 0,
          saturation: 100,
          brightness: 100,
        };
        return templateToTheme(template, hydrationSeed);
      }
    }

    // Otherwise use current theme
    return currentTheme;
  };

  // Single theme state used by both main page sections and overlay
  const [theme, setTheme] = useState<Theme>(getInitialTheme());
  const templateName = getTemplateName();

  const [selectedColorKey, setSelectedColorKey] = useState<keyof Theme | null>(
    null
  );

  const handleColorChange = (colorKey: keyof Theme, newColor: string) => {
    setTheme((prev) => ({
      ...prev,
      [colorKey]: newColor,
    }));
  };

  const colorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleColorSelect = (colorKey: keyof Theme) => {
    if (selectedColorKey === colorKey) {
      setSelectedColorKey(null);
    } else {
      setSelectedColorKey(colorKey);

      // Scroll the selected color to the top of the screen with navbar offset (overlay only)
      setTimeout(() => {
        const colorElement = colorRefs.current[colorKey];
        if (colorElement) {
          const elementPosition =
            colorElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 80; // Adjust this value based on your navbar height

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  const colorCategories = {
    'Surface Hierarchy': [
      'background',
      'onBackground',
      'surface',
      'onSurface',
      'surfaceVariant',
      'onSurfaceVariant',
    ],
    'Brand Colors': [
      'primary',
      'onPrimary',
      'secondary',
      'onSecondary',
      'tertiary',
      'onTertiary',
    ],
    'Interactive States': [
      'border',
      'hover',
      'focus',
      'disabled',
      'onDisabled',
      'link',
      'onLink',
    ],
    'Semantic States': [
      'error',
      'onError',
      'success',
      'onSuccess',
      'warning',
      'onWarning',
      'info',
      'onInfo',
      'neutral',
      'onNeutral',
      'highlight',
      'onHighlight',
    ],
  };

  // Generate CSS custom properties for the page based on current selections
  const pageStyles = {
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

  return (
    <div style={pageStyles}>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--on-background)',
        }}
      >
        <div className="max-w-7xl mx-auto p-8">
          {/* Page Header */}
          <div className="mb-16 text-center">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: 'var(--on-background)' }}
            >
              Theme Creator
            </h1>
            <p
              className="text-lg opacity-70"
              style={{ color: 'var(--on-background)' }}
            >
              Customize your theme colors and see them come to life
            </p>
          </div>

          {/* Section 1: Surface Hierarchy */}
          <SurfaceHierarchySection
            theme={theme}
            selectedColorKey={selectedColorKey}
            onColorSelect={handleColorSelect}
            onColorChange={handleColorChange}
          />

          {/* Section 2: Brand Colors */}
          <BrandColorsSection
            theme={theme}
            selectedColorKey={selectedColorKey}
            onColorSelect={handleColorSelect}
            onColorChange={handleColorChange}
          />

          {/* Section 3: Interactive States */}
          <InteractiveStatesSection
            theme={theme}
            selectedColorKey={selectedColorKey}
            onColorSelect={handleColorSelect}
            onColorChange={handleColorChange}
          />

          {/* Section 4: Semantic States */}
          <SemanticStatesSection
            theme={theme}
            selectedColorKey={selectedColorKey}
            onColorSelect={handleColorSelect}
            onColorChange={handleColorChange}
          />

          {/* Section 5: Theme Review */}
          <ThemeReviewControls
            theme={theme}
            setIsOverlayOpen={setIsOverlayOpen}
            templateName={templateName}
            compact={!isLargeScreen}
          />
        </div>
      </div>

      <FullScreenOverlay
        isOpen={isOverlayOpen}
        setIsOpen={setIsOverlayOpen}
        className="pb-8"
      >
        <div
          className="min-h-screen w-full"
          style={{
            backgroundColor: 'var(--background)',
            color: 'var(--on-background)',
          }}
        >
          <div className="max-w-7xl mx-auto px-8">
            <h2
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: 'var(--on-background)' }}
            >
              Quick Edit All Colors
            </h2>
            {/* Color Categories */}
            <div className="space-y-6">
              {Object.entries(colorCategories).map(([category, colors]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-semibold text-center">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {colors.map((colorKey) => {
                      const colorRef = createRef<HTMLDivElement>();
                      colorRefs.current[colorKey] = colorRef.current;

                      return (
                        <ColorPickerDropdown
                          key={colorKey}
                          colorKey={colorKey as keyof Theme}
                          colorValue={theme[colorKey as keyof Theme] as string}
                          isSelected={selectedColorKey === colorKey}
                          onSelect={handleColorSelect}
                          onColorChange={handleColorChange}
                          colorRef={colorRef as RefObject<HTMLDivElement>}
                          showExtraControls={true}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FullScreenOverlay>
    </div>
  );
}

export default function ThemeCreator() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ThemeCreatorContent />
    </Suspense>
  );
}
