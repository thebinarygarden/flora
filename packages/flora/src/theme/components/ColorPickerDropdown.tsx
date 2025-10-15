'use client';

import * as React from 'react';
import { Theme } from '../types';
import { HSBColorPicker } from '../../form';
import { ColorTile } from './ColorTile';

interface ColorPickerDropdownProps {
  colorKey: keyof Theme;
  colorValue: string;
  isSelected: boolean;
  onSelect: (colorKey: keyof Theme) => void;
  onColorChange: (colorKey: keyof Theme, newColor: string) => void;
  colorRef?: React.RefObject<HTMLDivElement>;
  showExtraControls?: boolean;
}

export function ColorPickerDropdown({
  colorKey,
  colorValue,
  isSelected,
  onSelect,
  onColorChange,
  colorRef,
  showExtraControls = false,
}: ColorPickerDropdownProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  // Sync picker open state with isSelected prop
  const isPickerOpen = isSelected;

  // Close picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutsideCard =
        cardRef.current && !cardRef.current.contains(target);
      const clickedOutsidePicker =
        pickerRef.current && !pickerRef.current.contains(target);

      if (clickedOutsideCard && clickedOutsidePicker) {
        onSelect(null as any); // Deselect when clicking outside
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen, onSelect]);

  const handleColorChange = (newColor: string) => {
    onColorChange(colorKey, newColor);
  };

  const handleClick = () => {
    onSelect(colorKey);
  };

  const formatLabel = (key: keyof Theme) => {
    return String(key)
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div ref={colorRef} className="relative">
      {/* Color Card - Fixed Height */}
      <div
        ref={cardRef}
        onClick={handleClick}
        className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer relative overflow-hidden"
        style={{
          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
          backgroundColor: isSelected
            ? 'var(--surface-variant)'
            : 'var(--background)',
          boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
          transition:
            'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            const overlay = e.currentTarget.querySelector(
              '.hover-overlay'
            ) as HTMLElement;
            if (overlay) overlay.style.opacity = '1';
          }
        }}
        onMouseLeave={(e) => {
          const overlay = e.currentTarget.querySelector(
            '.hover-overlay'
          ) as HTMLElement;
          if (overlay) overlay.style.opacity = '0';
        }}
      >
        {/* Hover overlay */}
        {!isSelected && (
          <span
            className="hover-overlay absolute inset-0 transition-opacity pointer-events-none"
            style={{
              backgroundColor: 'var(--hover)',
              opacity: 0,
            }}
          />
        )}

        {/* Color Preview Rectangle */}
        <ColorTile
          hex={colorValue}
          showLabel={false}
          showHex={false}
          variant="plain"
          className="relative z-10"
          previewClassName="w-full h-12"
        />

        {/* Label and Hex Value */}
        <div className="text-center relative z-10">
          <div
            className="text-sm font-medium"
            style={{
              color: isSelected
                ? 'var(--on-surface-variant)'
                : 'var(--on-background)',
            }}
          >
            {formatLabel(colorKey)}
          </div>
          <div
            className="text-xs font-mono opacity-70"
            style={{
              color: isSelected
                ? 'var(--on-surface-variant)'
                : 'var(--on-background)',
            }}
          >
            {colorValue}
          </div>
        </div>
      </div>

      {/* HSB Color Picker - Absolute Positioned Below Card */}
      {isPickerOpen && (
        <div
          ref={pickerRef}
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border-2 p-4"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <HSBColorPicker
            initialHex={colorValue}
            onChangeHex={handleColorChange}
            sb={showExtraControls}
          />
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-8px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `,
        }}
      />
    </div>
  );
}
