"use client";
import * as React from 'react';

export interface HSBColor {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
}

interface HSBColorPickerProps {
  value: HSBColor;
  onChange: (color: HSBColor) => void;
  className?: string;
}

export const HSBColorPicker: React.FC<HSBColorPickerProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isDragging, setIsDragging] = React.useState<'saturation' | 'hue' | 'brightness' | 'saturation-2d' | null>(null);
  const saturation2DRef = React.useRef<HTMLDivElement>(null);
  const saturationRef = React.useRef<HTMLDivElement>(null);
  const hueRef = React.useRef<HTMLDivElement>(null);
  const brightnessRef = React.useRef<HTMLDivElement>(null);

  // Convert HSB to hex for display
  const hsbToHex = React.useCallback((h: number, s: number, b: number): string => {
    const sNorm = s / 100;
    const bNorm = b / 100;
    
    const c = bNorm * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = bNorm - c;
    
    let r = 0, g = 0, blue = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; blue = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; blue = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; blue = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; blue = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; blue = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; blue = x;
    }
    
    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((blue + m) * 255).toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  }, []);

  // Convert HSB to HSL for CSS
  const hsbToHsl = React.useCallback((h: number, s: number, b: number) => {
    const sNorm = s / 100;
    const bNorm = b / 100;
    
    const l = bNorm * (1 - sNorm / 2);
    const sHsl = l === 0 || l === 1 ? 0 : (bNorm - l) / Math.min(l, 1 - l);
    
    return {
      h: h,
      s: Math.round(sHsl * 100),
      l: Math.round(l * 100)
    };
  }, []);

  const handleMouseDown = (type: 'saturation' | 'hue' | 'brightness' | 'saturation-2d') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
    handleMouseMove(type)(e);
  };

  const handleMouseMove = (type: 'saturation' | 'hue' | 'brightness' | 'saturation-2d') => (e: React.MouseEvent | MouseEvent) => {
    if (type === 'saturation-2d' && saturation2DRef.current) {
      const rect = saturation2DRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      
      onChange({
        ...value,
        s: Math.round(x * 100),
        b: Math.round((1 - y) * 100)
      });
    } else if (type === 'hue' && hueRef.current) {
      const rect = hueRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      onChange({
        ...value,
        h: Math.round(x * 360)
      });
    } else if (type === 'saturation' && saturationRef.current) {
      const rect = saturationRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      onChange({
        ...value,
        s: Math.round(x * 100)
      });
    } else if (type === 'brightness' && brightnessRef.current) {
      const rect = brightnessRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      
      onChange({
        ...value,
        b: Math.round((1 - y) * 100)
      });
    }
  };

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(isDragging)(e);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const currentColor = hsbToHex(value.h, value.s, value.b);
  const hueColor = hsbToHex(value.h, 100, 100);
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Color Preview */}
      <div className="flex items-center gap-4">
        <div 
          className="w-16 h-16 rounded-lg border-2 border-border shadow-sm"
          style={{ backgroundColor: currentColor }}
        />
        <div className="flex-1">
          <div className="text-sm font-medium">Current Color</div>
          <div className="text-xs text-onSurface opacity-60 font-mono">{currentColor}</div>
          <div className="text-xs text-onSurface opacity-60">
            HSB({value.h}, {value.s}%, {value.b}%)
          </div>
        </div>
      </div>

      {/* Hue Slider */}
      <div 
        ref={hueRef}
        className="relative w-full h-8 cursor-pointer rounded border border-border overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
        }}
        onMouseDown={handleMouseDown('hue')}
      >
        {/* Hue Indicator */}
        <div
          className="absolute w-3 h-full bg-white border border-gray-300 shadow-sm transform -translate-x-1/2 pointer-events-none rounded"
          style={{ left: `${(value.h / 360) * 100}%` }}
        />
      </div>

      {/* Main Color Picker Area */}
      <div className="flex gap-4">
        {/* Brightness Slider (Vertical) */}
        <div 
          ref={brightnessRef}
          className="relative w-8 cursor-pointer rounded border border-border overflow-hidden"
          style={{
            background: `linear-gradient(to bottom, ${hsbToHex(value.h, value.s, 100)}, #000000)`,
            aspectRatio: '1 / 4'
          }}
          onMouseDown={handleMouseDown('brightness')}
        >
          {/* Brightness Indicator */}
          <div
            className="absolute w-full h-3 bg-white border border-gray-300 shadow-sm transform -translate-y-1/2 pointer-events-none rounded"
            style={{ top: `${100 - value.b}%` }}
          />
        </div>

        {/* Saturation/Brightness 2D Picker */}
        <div 
          ref={saturation2DRef}
          className="relative flex-1 aspect-square cursor-crosshair rounded border border-border overflow-hidden"
          style={{
            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`
          }}
          onMouseDown={handleMouseDown('saturation-2d')}
        >
          {/* Saturation/Brightness Indicator */}
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${value.s}%`,
              top: `${100 - value.b}%`,
              backgroundColor: currentColor
            }}
          />
        </div>
      </div>

      {/* Saturation Slider */}
      <div 
        ref={saturationRef}
        className="relative h-8 cursor-pointer rounded border border-border overflow-hidden"
        style={{
          background: `linear-gradient(to right, #808080, ${hsbToHex(value.h, 100, value.b)})`,
          marginLeft: 'calc(2rem + 1rem)' // brightness slider width (w-8 = 2rem) + gap (gap-4 = 1rem)
        }}
        onMouseDown={handleMouseDown('saturation')}
      >
        {/* Saturation Indicator */}
        <div
          className="absolute w-3 h-full bg-white border border-gray-300 shadow-sm transform -translate-x-1/2 pointer-events-none rounded"
          style={{ left: `${value.s}%` }}
        />
      </div>

    </div>
  );
};