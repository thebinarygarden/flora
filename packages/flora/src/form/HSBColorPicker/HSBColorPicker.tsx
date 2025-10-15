'use client';
import * as React from 'react';
import { HSBColor, HSBColorPickerProps } from './types';
import { hsbToHex, hexToHsb } from './colorUtils';
import { useColorPicker } from './useColorPicker';

// Constants moved outside component to prevent re-instantiation
const DEFAULT_COLOR = '#299bba';
const HUE_GRADIENT =
  'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';

export const HSBColorPicker: React.FC<HSBColorPickerProps> = ({
  onChangeHex,
  className = '',
  initialHex,
  sb = false,
}) => {
  const initialColor = initialHex || DEFAULT_COLOR;

  // Internal HSB state - maintains precision during interactions
  const [internalHsb, setInternalHsb] = React.useState(() =>
    hexToHsb(initialColor)
  );

  // Refs
  const sbGridRef = React.useRef<HTMLDivElement | null>(null);
  const hueRef = React.useRef<HTMLDivElement | null>(null);
  const saturationRef = React.useRef<HTMLDivElement | null>(null);
  const brightnessRef = React.useRef<HTMLDivElement | null>(null);

  // Track current internal hex to detect external changes
  const internalHexRef = React.useRef(
    hsbToHex(internalHsb.h, internalHsb.s, internalHsb.b)
  );

  // Update internal hex ref whenever internal HSB changes
  React.useEffect(() => {
    internalHexRef.current = hsbToHex(
      internalHsb.h,
      internalHsb.s,
      internalHsb.b
    );
  }, [internalHsb.h, internalHsb.s, internalHsb.b]);

  // Sync external initialHex changes to internal state
  React.useEffect(() => {
    if (
      initialHex &&
      initialHex.toLowerCase() !== internalHexRef.current.toLowerCase()
    ) {
      setInternalHsb(hexToHsb(initialHex));
    }
  }, [initialHex]);

  const handleHsbChange = React.useCallback(
    (newHsb: HSBColor) => {
      setInternalHsb(newHsb);
      const hexValue = hsbToHex(newHsb.h, newHsb.s, newHsb.b);
      onChangeHex(hexValue);
    },
    [onChangeHex]
  );

  // Custom hook for color picker logic
  const { handleMouseDown, handleTouchStart } = useColorPicker({
    internalHsb,
    handleHsbChange,
    sbGridRef,
    hueRef,
    saturationRef,
    brightnessRef,
  });

  const hueColor = React.useMemo(
    () => hsbToHex(internalHsb.h, 100, 100),
    [internalHsb.h]
  );
  const hexColor = React.useMemo(
    () => hsbToHex(internalHsb.h, internalHsb.s, internalHsb.b),
    [internalHsb.h, internalHsb.s, internalHsb.b]
  );

  const huePosition = React.useMemo(
    () => (internalHsb.h / 359) * 100,
    [internalHsb.h]
  );
  const saturationPosition = React.useMemo(
    () => internalHsb.s,
    [internalHsb.s]
  );
  const brightnessPosition = React.useMemo(
    () => 100 - internalHsb.b,
    [internalHsb.b]
  );

  const hueIndicatorStyle = React.useMemo(
    () => ({
      left: `${huePosition}%`,
      top: '50%',
      backgroundColor: hueColor,
      border: `4px solid white`,
    }),
    [huePosition, hueColor]
  );

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
      left: `${saturationPosition}%`,
      top: `${brightnessPosition}%`,
      backgroundColor: hexColor,
      border: `4px solid white`,
    }),
    [saturationPosition, brightnessPosition, hexColor]
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

  const saturationIndicatorStyle = React.useMemo(
    () => ({
      left: `${saturationPosition}%`,
      top: '50%',
      backgroundColor: hsbToHex(internalHsb.h, internalHsb.s, 100),
      border: `4px solid white`,
    }),
    [saturationPosition, internalHsb.h, internalHsb.s]
  );

  const brightnessIndicatorStyle = React.useMemo(
    () => ({
      left: `${internalHsb.b}%`,
      top: '50%',
      backgroundColor: hsbToHex(internalHsb.h, 100, internalHsb.b),
      border: `4px solid white`,
    }),
    [internalHsb.b, internalHsb.h]
  );

  return (
    <div className={className}>
      {/* Hue Slider Container with padding for overhang */}
      <div className="py-2 mb-2">
        <div
          ref={hueRef}
          className="relative w-full h-3 cursor-pointer rounded-full"
          style={{
            background: HUE_GRADIENT,
            border: `1px solid var(--on-background)`,
            touchAction: 'none',
          }}
          onMouseDown={handleMouseDown('hue')}
          onTouchStart={handleTouchStart('hue')}
        >
          {/* Hue Indicator */}
          <div
            className="absolute w-4 h-7 shadow-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-lg"
            style={hueIndicatorStyle}
          />
        </div>
      </div>

      {/* Saturation/Brightness 2D Grid */}
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

      {/* Conditional Saturation and Brightness Sliders */}
      {sb && (
        <>
          {/* Saturation Slider */}
          <div className="py-2 mt-2">
            <div
              ref={saturationRef}
              className="relative w-full h-3 cursor-pointer rounded-full"
              style={{
                background: saturationGradient,
                border: `1px solid var(--on-background)`,
                touchAction: 'none',
              }}
              onMouseDown={handleMouseDown('saturation')}
              onTouchStart={handleTouchStart('saturation')}
            >
              {/* Saturation Indicator */}
              <div
                className="absolute w-4 h-7 shadow-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-lg"
                style={saturationIndicatorStyle}
              />
            </div>
          </div>

          {/* Brightness Slider */}
          <div className="py-2">
            <div
              ref={brightnessRef}
              className="relative w-full h-3 cursor-pointer rounded-full"
              style={{
                background: brightnessGradient,
                border: `1px solid var(--on-background)`,
                touchAction: 'none',
              }}
              onMouseDown={handleMouseDown('brightness')}
              onTouchStart={handleTouchStart('brightness')}
            >
              {/* Brightness Indicator */}
              <div
                className="absolute w-4 h-7 shadow-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-lg"
                style={brightnessIndicatorStyle}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
