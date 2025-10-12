"use client";

import { Theme } from "@flora/ui/theme";
import { ThemeSection } from '../ThemeSection';

interface SemanticStatesSectionProps {
    theme: Theme;
    selectedColorKey: keyof Theme | null;
    onColorSelect: (colorKey: keyof Theme) => void;
    onColorChange: (colorKey: keyof Theme, newColor: string) => void;
}

export function SemanticStatesSection(props: SemanticStatesSectionProps) {
    const colors = ['error', 'onError', 'success', 'onSuccess', 'warning', 'onWarning'] as const;

    const preview = (
        <div className="space-y-3">
            {/* Success Alert */}
            <div
                className="p-3 rounded-lg"
                style={{
                    backgroundColor: 'var(--success)',
                    color: 'var(--on-success)'
                }}
            >
                <p className="text-xs font-semibold">✓ Success</p>
                <p className="text-xs opacity-80 mt-1">Operation completed</p>
            </div>

            {/* Warning Alert */}
            <div
                className="p-3 rounded-lg"
                style={{
                    backgroundColor: 'var(--warning)',
                    color: 'var(--on-warning)'
                }}
            >
                <p className="text-xs font-semibold">⚠ Warning</p>
                <p className="text-xs opacity-80 mt-1">Please review this</p>
            </div>

            {/* Error Alert */}
            <div
                className="p-3 rounded-lg"
                style={{
                    backgroundColor: 'var(--error)',
                    color: 'var(--on-error)'
                }}
            >
                <p className="text-xs font-semibold">✕ Error</p>
                <p className="text-xs opacity-80 mt-1">Something went wrong</p>
            </div>
        </div>
    );

    return (
        <ThemeSection
            title="4. Semantic States"
            description="Set colors for error, success, and warning messages"
            colors={colors}
            {...props}
            preview={preview}
        />
    );
}
