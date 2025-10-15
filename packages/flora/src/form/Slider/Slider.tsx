'use client';
import * as React from 'react';
import { SliderProps } from './types';
import { useSlider } from './useSlider';

export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  onChange,
  gradient,
  className = '',
  indicatorColor,
}) => {
  // Ref
  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  const handleChange = React.useCallback(
    (newValue: number) => {
      onChange(newValue);
    },
    [onChange]
  );

  // Custom hook for slider logic
  const { handleMouseDown, handleTouchStart } = useSlider({
    value,
    min,
    max,
    handleChange,
    sliderRef,
  });

  const position = React.useMemo(
    () => ((value - min) / (max - min)) * 100,
    [value, min, max]
  );

  const computedIndicatorColor = React.useMemo(() => {
    if (typeof indicatorColor === 'function') {
      return indicatorColor(value);
    }
    return indicatorColor || 'var(--primary)';
  }, [indicatorColor, value]);

  const indicatorStyle = React.useMemo(
    () => ({
      left: `${position}%`,
      top: '50%',
      backgroundColor: computedIndicatorColor,
      border: `4px solid white`,
    }),
    [position, computedIndicatorColor]
  );

  return (
    <div className={className}>
      {/* Slider Container with padding for overhang */}
      <div className="py-2">
        <div
          ref={sliderRef}
          className="relative w-full h-3 cursor-pointer rounded-full"
          style={{
            background: gradient,
            border: `1px solid var(--on-background)`,
            touchAction: 'none',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Slider Indicator */}
          <div
            className="absolute w-4 h-7 shadow-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-lg"
            style={indicatorStyle}
          />
        </div>
      </div>
    </div>
  );
};
