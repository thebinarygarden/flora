"use client";

import {useState, useRef, createRef, useEffect, CSSProperties, RefObject} from 'react';
import {FullScreenOverlay} from '@binarygarden/flora/overlay';
import {Theme, useTheme, ColorPickerDropdown} from '@binarygarden/flora/theme';
import {SurfaceHierarchySection} from './_components/sections/SurfaceHierarchySection';
import {BrandColorsSection} from './_components/sections/BrandColorsSection';
import {InteractiveStatesSection} from './_components/sections/InteractiveStatesSection';
import {SemanticStatesSection} from './_components/sections/SemanticStatesSection';
import {ThemeReviewControls} from './_components/ThemeReviewControls';
import {ThemeReviewControlsSm} from './_components/ThemeReviewControlsSm';

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

export default function ThemeCreator() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const { theme: currentTheme } = useTheme();
    const { width } = useWindowSize();
    const isLargeScreen = width >= 1024;

    // Single theme state used by both main page sections and overlay
    const [theme, setTheme] = useState<Theme>({
        // Start with current theme values
        primary: currentTheme.primary,
        onPrimary: currentTheme.onPrimary,
        secondary: currentTheme.secondary,
        onSecondary: currentTheme.onSecondary,
        tertiary: currentTheme.tertiary,
        onTertiary: currentTheme.onTertiary,
        background: currentTheme.background,
        onBackground: currentTheme.onBackground,
        surface: currentTheme.surface,
        onSurface: currentTheme.onSurface,
        border: currentTheme.border,
        hover: currentTheme.hover,
        focus: currentTheme.focus,
        disabled: currentTheme.disabled,
        onDisabled: currentTheme.onDisabled,
        error: currentTheme.error,
        onError: currentTheme.onError,
        success: currentTheme.success,
        onSuccess: currentTheme.onSuccess,
        warning: currentTheme.warning,
        onWarning: currentTheme.onWarning
    });

    const [selectedColorKey, setSelectedColorKey] = useState<keyof Theme | null>(null);

    const handleColorChange = (colorKey: keyof Theme, newColor: string) => {
        setTheme(prev => ({
            ...prev,
            [colorKey]: newColor
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
                    const elementPosition = colorElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - 80; // Adjust this value based on your navbar height

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    const colorCategories = {
        'Surface Hierarchy': ['background', 'onBackground', 'surface', 'onSurface'],
        'Brand Colors': ['primary', 'onPrimary', 'secondary', 'onSecondary', 'tertiary', 'onTertiary'],
        'Interactive States': ['border', 'hover', 'focus', 'disabled', 'onDisabled'],
        'Semantic States': ['error', 'onError', 'success', 'onSuccess', 'warning', 'onWarning']
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
        '--border': theme.border,
        '--hover': theme.hover,
        '--focus': theme.focus,
        '--disabled': theme.disabled,
        '--on-disabled': theme.onDisabled,
        '--error': theme.error,
        '--on-error': theme.onError,
        '--success': theme.success,
        '--on-success': theme.onSuccess,
        '--warning': theme.warning,
        '--on-warning': theme.onWarning,
    } as CSSProperties;

    return (
        <div style={pageStyles}>
            <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)' }}>
                <div className="max-w-7xl mx-auto p-8">
                    {/* Page Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--on-background)' }}>
                            Theme Creator
                        </h1>
                        <p className="text-lg opacity-70" style={{ color: 'var(--on-background)' }}>
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
                    {isLargeScreen ? (
                        <ThemeReviewControls
                            theme={theme}
                            setIsOverlayOpen={setIsOverlayOpen}
                        />
                    ) : (
                        <ThemeReviewControlsSm
                            theme={theme}
                            setIsOverlayOpen={setIsOverlayOpen}
                        />
                    )}
                </div>
            </div>

            <FullScreenOverlay isOpen={isOverlayOpen} setIsOpen={setIsOverlayOpen}>
                <div
                    className="min-h-screen p-8 w-full"
                    style={{
                        backgroundColor: 'var(--background)',
                        color: 'var(--on-background)'
                    }}
                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--on-background)' }}>
                            Quick Edit All Colors
                        </h2>
                        {/* Color Categories */}
                        <div className="space-y-6">
                            {Object.entries(colorCategories).map(([category, colors]) => (
                                <div key={category} className="space-y-3">
                                    <h3 className="text-lg font-semibold text-center">{category}</h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
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
