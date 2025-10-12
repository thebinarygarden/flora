"use client";

import { Theme } from "@flora/ui/theme";
import { ColorPickerDropdown } from './ColorPickerDropdown';

interface ThemeSectionProps {
    title: string;
    description: string;
    colors: readonly string[];
    theme: Theme;
    selectedColorKey: keyof Theme | null;
    onColorSelect: (colorKey: keyof Theme) => void;
    onColorChange: (colorKey: keyof Theme, newColor: string) => void;
    preview?: React.ReactNode;
}

export function ThemeSection({
    title,
    description,
    colors,
    theme,
    selectedColorKey,
    onColorSelect,
    onColorChange,
    preview
}: ThemeSectionProps) {
    return (
        <section
            className="mb-16"
            style={{
                paddingBottom: '3rem',
                borderBottom: '2px solid var(--border)'
            }}
        >
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--on-background)' }}>
                    {title}
                </h2>
                <p className="opacity-70" style={{ color: 'var(--on-background)' }}>
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Color Pickers */}
                <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {colors.map((colorKey) => (
                        <ColorPickerDropdown
                            key={colorKey}
                            colorKey={colorKey as keyof Theme}
                            colorValue={theme[colorKey as keyof Theme] as string}
                            isSelected={selectedColorKey === colorKey}
                            onSelect={onColorSelect}
                            onColorChange={onColorChange}
                        />
                    ))}
                </div>

                {/* Live Preview */}
                {preview && (
                    <div className="lg:col-span-1">
                        <div
                            className="p-6 rounded-xl border-2 sticky top-24"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)'
                            }}
                        >
                            <h3 className="text-sm font-semibold mb-4 opacity-70" style={{ color: 'var(--on-surface)' }}>
                                Live Preview
                            </h3>
                            {preview}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
