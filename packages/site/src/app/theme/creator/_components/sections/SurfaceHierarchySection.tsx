"use client";

import { Theme } from '@binarygarden/flora/theme';
import { ThemeSection } from '../ThemeSection';

interface SurfaceHierarchySectionProps {
    theme: Theme;
    selectedColorKey: keyof Theme | null;
    onColorSelect: (colorKey: keyof Theme) => void;
    onColorChange: (colorKey: keyof Theme, newColor: string) => void;
}

export function SurfaceHierarchySection(props: SurfaceHierarchySectionProps) {
    const colors = ['background', 'onBackground', 'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant'] as const;

    const preview = (
        <div className="space-y-4">
            {/* Background - Simple inline display */}
            <div className="flex items-center gap-2 px-2 py-1">
                <div
                    className="w-6 h-6 rounded border-2"
                    style={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)'
                    }}
                />
                <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--on-background)' }}>
                        Background Layer
                    </p>
                    <p className="text-xs opacity-60" style={{ color: 'var(--on-background)' }}>
                        Main page background
                    </p>
                </div>
            </div>

            {/* Surface Layer with nested Surface Variant */}
            <div
                className="p-4 rounded-lg"
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '2px solid var(--border)'
                }}
            >
                <p className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                    Surface Layer
                </p>
                <p className="text-xs opacity-70 mt-1 mb-3" style={{ color: 'var(--on-surface)' }}>
                    Elevated cards with on-surface text
                </p>

                {/* Surface Variant - Nested inside Surface */}
                <div
                    className="p-3 rounded-lg mt-2"
                    style={{
                        backgroundColor: 'var(--surface-variant)',
                        border: '2px solid var(--border)'
                    }}
                >
                    <p className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                        Surface Variant Layer
                    </p>
                    <p className="text-xs opacity-70 mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                        Alternative surface for emphasis and hierarchy
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <ThemeSection
            title="1. Surface Hierarchy"
            description="Define the foundational colors that create depth and hierarchy"
            colors={colors}
            {...props}
            preview={preview}
        />
    );
}
