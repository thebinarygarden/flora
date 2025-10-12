"use client";

import { useState, useRef, useEffect } from 'react';
import { Theme } from "@flora/ui/theme";
import { HSBColorPicker } from '@flora/ui/input';

interface ColorPickerDropdownProps {
    colorKey: keyof Theme;
    colorValue: string;
    isSelected: boolean;
    onSelect: (colorKey: keyof Theme) => void;
    onColorChange: (colorKey: keyof Theme, newColor: string) => void;
    colorRef?: React.RefObject<HTMLDivElement>;
}

export function ColorPickerDropdown({
    colorKey,
    colorValue,
    isSelected,
    onSelect,
    onColorChange,
    colorRef
}: ColorPickerDropdownProps) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsPickerOpen(false);
            }
        };

        if (isPickerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPickerOpen]);

    const handleColorChange = (newColor: string) => {
        onColorChange(colorKey, newColor);
    };

    const handleClick = () => {
        onSelect(colorKey);
        setIsPickerOpen(!isPickerOpen);
    };

    const formatLabel = (key: string) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    return (
        <div
            ref={colorRef}
            className="relative"
        >
            <div
                ref={pickerRef}
                onClick={handleClick}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer overflow-hidden hover:shadow-md"
                style={{
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: isSelected ? 'var(--surface)' : 'var(--background)',
                    boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                    maxHeight: isPickerOpen ? '600px' : '140px',
                    transition: 'all 0.3s ease'
                }}
            >
                {/* Color Preview Circle */}
                <div
                    className="w-16 h-16 rounded-full border-2"
                    style={{
                        backgroundColor: colorValue,
                        borderColor: 'var(--border)',
                        boxShadow: isPickerOpen ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                />

                {/* Label and Hex Value */}
                <div className="text-center">
                    <div
                        className="text-sm font-medium"
                        style={{ color: isSelected ? 'var(--on-surface)' : 'var(--on-background)' }}
                    >
                        {formatLabel(colorKey)}
                    </div>
                    <div
                        className="text-xs font-mono opacity-70"
                        style={{ color: isSelected ? 'var(--on-surface)' : 'var(--on-background)' }}
                    >
                        {colorValue}
                    </div>
                </div>

                {/* Integrated HSB Color Picker */}
                {isPickerOpen && (
                    <div
                        className="w-full pt-3 mt-2 border-t"
                        style={{
                            borderColor: 'var(--border)',
                            opacity: 1,
                            animation: 'fadeIn 0.2s ease-out'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <HSBColorPicker
                            initialHex={colorValue}
                            onChangeHex={handleColorChange}
                        />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
