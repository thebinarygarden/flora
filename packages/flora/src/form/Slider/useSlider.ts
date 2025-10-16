import * as React from 'react';
import { UseSliderProps } from './types';

export const useSlider = ({
  value: _value,
  min,
  max,
  handleChange,
  sliderRef,
}: UseSliderProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const updateValue = React.useCallback(
    (clientX: number) => {
      const element = sliderRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

      const newValue = Math.round(min + x * (max - min));
      handleChange(newValue);
    },
    [handleChange, sliderRef, min, max]
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      updateValue(e.clientX);
    },
    [updateValue]
  );

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);

      if (e.touches[0]) {
        updateValue(e.touches[0].clientX);
      }
    },
    [updateValue]
  );

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent scrolling during drag
        if (e.touches[0]) {
          updateValue(e.touches[0].clientX);
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, updateValue]);

  return {
    handleMouseDown,
    handleTouchStart,
  };
};
