"use client";

import { Theme } from '@binarygarden/flora/theme';
import { ThemeSection } from '../ThemeSection';
import { Button } from '@binarygarden/flora/form';

interface InteractiveStatesSectionProps {
    theme: Theme;
    selectedColorKey: keyof Theme | null;
    onColorSelect: (colorKey: keyof Theme) => void;
    onColorChange: (colorKey: keyof Theme, newColor: string) => void;
}

export function InteractiveStatesSection(props: InteractiveStatesSectionProps) {
    const colors = ['border', 'hover', 'focus', 'disabled', 'onDisabled', 'link', 'onLink'] as const;

    const preview = (
        <div className="space-y-4">
            {/* Border Example */}
            <div
                className="p-3 rounded-lg"
                style={{
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--background)'
                }}
            >
                <p className="text-xs font-medium" style={{ color: 'var(--on-background)' }}>
                    Border Color
                </p>
            </div>

            {/* Hover Example */}
            <div
                className="p-3 rounded-lg cursor-pointer"
                style={{
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--background)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--background)';
                }}
            >
                <p className="text-xs font-medium" style={{ color: 'var(--on-background)' }}>
                    Hover me!
                </p>
            </div>

            {/* Focus Example */}
            <input
                type="text"
                placeholder="Focus state"
                className="w-full p-3 rounded-lg text-xs outline-none transition-all"
                style={{
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--on-background)'
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--focus)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                }}
            />

            {/* Disabled Example */}
            <Button variant="primary" disabled className="w-full">
                Disabled Button
            </Button>

            {/* Link Example */}
            <div
                className="p-3 rounded-lg"
                style={{
                    backgroundColor: 'var(--background)'
                }}
            >
                <p className="text-xs" style={{ color: 'var(--on-background)' }}>
                    Click{' '}
                    <a
                        href="#"
                        className="font-medium underline hover:opacity-80"
                        style={{ color: 'var(--link)' }}
                        onClick={(e) => e.preventDefault()}
                    >
                        here
                    </a>
                    {' '}to learn more
                </p>
            </div>
        </div>
    );

    return (
        <ThemeSection
            title="3. Interactive States"
            description="Configure colors for borders, hover, focus, and disabled states"
            colors={colors}
            {...props}
            preview={preview}
        />
    );
}
