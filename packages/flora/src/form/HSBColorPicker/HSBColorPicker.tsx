'use client';
import * as React from 'react';
import { HSBColor, HSBColorPickerProps } from './types';
import { hsbToHex, hexToHsb } from './colorUtils';
import { useColorPicker } from './useColorPicker';
import { IconBGDocs } from '../../icons';
import { Slider } from '../Slider/Slider';

// Constants moved outside component to prevent re-instantiation
const DEFAULT_COLOR = '#299bba';
const HUE_GRADIENT =
  'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';
const MAX_HUE = 359;
const MAX_PERCENTAGE = 100;
const INDICATOR_BORDER = '4px solid white';

export const HSBColorPicker: React.FC<HSBColorPickerProps> = ({
  onChangeHex,
  className = '',
  initialHex,
  label,
  copyable = false,
  showColorIndicator = false,
  showGrid = true,
  sb = false,
}) => {
  const initialColor = initialHex || DEFAULT_COLOR;

  // Internal HSB state - maintains precision during interactions
  const [internalHsb, setInternalHsb] = React.useState(() =>
    hexToHsb(initialColor)
  );

  // Copy state for copyable functionality
  const [copied, setCopied] = React.useState(false);

  // Refs
  const sbGridRef = showGrid
    ? React.useRef<HTMLDivElement | null>(null)
    : undefined;

  // Sync external initialHex changes to internal state
  React.useEffect(() => {
    if (initialHex) {
      const currentHex = hsbToHex(internalHsb.h, internalHsb.s, internalHsb.b);
      if (initialHex.toLowerCase() !== currentHex.toLowerCase()) {
        setInternalHsb(hexToHsb(initialHex));
      }
    }
  }, [initialHex, internalHsb.h, internalHsb.s, internalHsb.b]);

  const handleHsbChange = React.useCallback(
    (newHsb: HSBColor) => {
      setInternalHsb(newHsb);
      const hexValue = hsbToHex(newHsb.h, newHsb.s, newHsb.b);
      onChangeHex(hexValue);
    },
    [onChangeHex]
  );

  // Custom hook for color picker logic (only for sb-grid)
  const { handleMouseDown, handleTouchStart } = useColorPicker({
    internalHsb,
    handleHsbChange,
    sbGridRef,
    hueRef: undefined,
    saturationRef: undefined,
    brightnessRef: undefined,
  });

  const hueColor = React.useMemo(
    () => hsbToHex(internalHsb.h, 100, 100),
    [internalHsb.h]
  );
  const hexColor = React.useMemo(
    () => hsbToHex(internalHsb.h, internalHsb.s, internalHsb.b),
    [internalHsb.h, internalHsb.s, internalHsb.b]
  );

  // Copy handler for copyable functionality
  const handleCopy = React.useCallback(async () => {
    if (!copyable) return;
    try {
      await navigator.clipboard.writeText(hexColor);
      setCopied(true);
      // Reset after 500ms
      setTimeout(() => setCopied(false), 500);
    } catch {
      // Silently fail - user will notice copy didn't work
    }
  }, [copyable, hexColor]);

  const sbGridAreaStyle = React.useMemo(
    () => ({
      background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
      border: `1px solid var(--on-background)`,
      touchAction: 'none' as const,
    }),
    [hueColor]
  );

  const sbGridIndicatorStyle = React.useMemo(
    () => ({
      left: `${internalHsb.s}%`,
      top: `${MAX_PERCENTAGE - internalHsb.b}%`,
      backgroundColor: hexColor,
      border: INDICATOR_BORDER,
    }),
    [internalHsb.s, internalHsb.b, hexColor]
  );

  // Saturation slider gradient: white to pure hue
  const saturationGradient = React.useMemo(
    () => `linear-gradient(to right, #fff, ${hueColor})`,
    [hueColor]
  );

  // Brightness slider gradient: black to pure hue
  const brightnessGradient = React.useMemo(
    () => `linear-gradient(to right, #000, ${hueColor})`,
    [hueColor]
  );

  return (
    <div className={className}>
      {/* Color Indicator with optional label */}
      {showColorIndicator && (
        <div className={label ? 'flex items-center gap-3 mb-3' : 'mb-3'}>
          {label && (
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--on-background)' }}
            >
              {label}
            </span>
          )}
          {copyable ? (
            <button
              onClick={handleCopy}
              className="h-8 rounded flex items-center gap-2 px-3 group"
              style={{
                backgroundColor: copied ? 'var(--success)' : hexColor,
                border: `1px solid ${copied ? 'var(--success)' : 'var(--on-background)'}`,
                flex: label ? '1' : undefined,
                width: label ? undefined : '100%',
                cursor: 'pointer',
              }}
            >
              <div className="flex-1" />
              <div
                className="flex-shrink-0 transition-transform group-hover:scale-110"
                style={{
                  color: copied ? 'var(--on-success)' : 'var(--on-background)',
                }}
              >
                <IconBGDocs size={16} />
              </div>
            </button>
          ) : (
            <div
              className="h-8 rounded"
              style={{
                backgroundColor: hexColor,
                border: `1px solid var(--on-background)`,
                flex: label ? '1' : undefined,
                width: label ? undefined : '100%',
              }}
            />
          )}
        </div>
      )}

      {/* Hue Slider */}
      <Slider
        value={internalHsb.h}
        min={0}
        max={MAX_HUE}
        onChange={(h) =>
          handleHsbChange({ h, s: internalHsb.s, b: internalHsb.b })
        }
        gradient={HUE_GRADIENT}
        indicatorColor={hueColor}
        className="mb-2"
      />

      {/* Saturation/Brightness 2D Grid */}
      {showGrid && (
        <div
          ref={sbGridRef}
          className="relative w-full aspect-square cursor-crosshair rounded overflow-hidden"
          style={sbGridAreaStyle}
          onMouseDown={handleMouseDown('sb-grid')}
          onTouchStart={handleTouchStart('sb-grid')}
        >
          {/* Saturation/Brightness Indicator */}
          <div
            className="absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={sbGridIndicatorStyle}
          />
        </div>
      )}

      {/* Conditional Saturation and Brightness Sliders */}
      {sb && (
        <>
          {/* Saturation Slider */}
          <Slider
            value={internalHsb.s}
            min={0}
            max={MAX_PERCENTAGE}
            onChange={(s) =>
              handleHsbChange({ h: internalHsb.h, s, b: internalHsb.b })
            }
            gradient={saturationGradient}
            indicatorColor={(s) => hsbToHex(internalHsb.h, s, MAX_PERCENTAGE)}
            className="mt-2"
          />

          {/* Brightness Slider */}
          <Slider
            value={internalHsb.b}
            min={0}
            max={MAX_PERCENTAGE}
            onChange={(b) =>
              handleHsbChange({ h: internalHsb.h, s: internalHsb.s, b })
            }
            gradient={brightnessGradient}
            indicatorColor={(b) => hsbToHex(internalHsb.h, MAX_PERCENTAGE, b)}
          />
        </>
      )}
    </div>
  );
};
