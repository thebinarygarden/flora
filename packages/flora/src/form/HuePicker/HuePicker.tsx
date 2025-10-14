"use client";
import * as React from 'react';
import { HuePickerProps } from './types';
import { hsbToHex } from '../HSBColorPicker/colorUtils';
import { useHuePicker } from './useHuePicker';

// Constants moved outside component to prevent re-instantiation
const DEFAULT_HUE = 0; // Red
const HUE_GRADIENT = 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';

export const HuePicker: React.FC<HuePickerProps> = ({
  onChangeHue,
  onChangeHex,
  className = '',
  initialHue
}) => {
  const initialHueValue = initialHue !== undefined ? initialHue : DEFAULT_HUE;

  // Internal hue state - maintains precision during interactions
  const [internalHue, setInternalHue] = React.useState(initialHueValue);

  // Ref
  const hueRef = React.useRef<HTMLDivElement | null>(null);

  const handleHueChange = React.useCallback((newHue: number) => {
    setInternalHue(newHue);
    onChangeHue(newHue);

    // If onChangeHex is provided, call it with the pure hue hex color (s=100, b=100)
    if (onChangeHex) {
      const hexValue = hsbToHex(newHue, 100, 100);
      onChangeHex(hexValue);
    }
  }, [onChangeHue, onChangeHex]);

  // Custom hook for hue picker logic
  const { handleMouseDown, handleTouchStart } = useHuePicker({
    internalHue,
    handleHueChange,
    hueRef
  });

  const hueColor = React.useMemo(() => hsbToHex(internalHue, 100, 100), [internalHue]);

  const huePosition = React.useMemo(() => (internalHue / 359) * 100, [internalHue]);

  const hueIndicatorStyle = React.useMemo(() => ({
    left: `${huePosition}%`,
    top: '50%',
    backgroundColor: hueColor,
    border: `4px solid white`
  }), [huePosition, hueColor]);

  return (
    <div className={className}>
      {/* Hue Slider Container with padding for overhang */}
      <div className="py-2">
        <div
          ref={hueRef}
          className="relative w-full h-3 cursor-pointer rounded-full"
          style={{
            background: HUE_GRADIENT,
            border: `1px solid var(--on-background)`,
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Hue Indicator */}
          <div
            className="absolute w-4 h-7 shadow-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-lg"
            style={hueIndicatorStyle}
          />
        </div>
      </div>
    </div>
  );
};
