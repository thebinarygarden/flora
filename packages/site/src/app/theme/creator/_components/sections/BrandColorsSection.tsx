"use client";

import { Theme } from '@binarygarden/flora/theme';
import { ThemeSection } from '../ThemeSection';
import { Button } from '@binarygarden/flora/input';

interface BrandColorsSectionProps {
    theme: Theme;
    selectedColorKey: keyof Theme | null;
    onColorSelect: (colorKey: keyof Theme) => void;
    onColorChange: (colorKey: keyof Theme, newColor: string) => void;
}

export function BrandColorsSection(props: BrandColorsSectionProps) {
    const colors = ['primary', 'onPrimary', 'secondary', 'onSecondary', 'tertiary', 'onTertiary'] as const;

    const preview = (
        <div className="space-y-4">
            <Button variant="primary" className="w-full">
                Primary Action
            </Button>
            <Button variant="secondary" className="w-full">
                Secondary Action
            </Button>
            <Button variant="tertiary" className="w-full">
                Tertiary Action
            </Button>

            <div className="flex gap-2 mt-6">
                <div
                    className="flex-1 px-3 py-1 rounded text-xs font-medium text-center"
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--on-primary)'
                    }}
                >
                    Primary
                </div>
                <div
                    className="flex-1 px-3 py-1 rounded text-xs font-medium text-center"
                    style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--on-secondary)'
                    }}
                >
                    Secondary
                </div>
                <div
                    className="flex-1 px-3 py-1 rounded text-xs font-medium text-center"
                    style={{
                        backgroundColor: 'var(--tertiary)',
                        color: 'var(--on-tertiary)'
                    }}
                >
                    Tertiary
                </div>
            </div>
        </div>
    );

    return (
        <ThemeSection
            title="2. Brand Colors"
            description="Set your primary, secondary, and tertiary brand colors"
            colors={colors}
            {...props}
            preview={preview}
        />
    );
}
