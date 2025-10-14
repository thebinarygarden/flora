import * as React from 'react';
import { UseHuePickerProps } from './types';

export const useHuePicker = ({
  internalHue,
  handleHueChange,
  hueRef
}: UseHuePickerProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const updateHue = React.useCallback((clientX: number) => {
    const element = hueRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

    const newHue = Math.round(x * 359);
    handleHueChange(newHue);
  }, [handleHueChange, hueRef]);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    updateHue(e.clientX);
  }, [updateHue]);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    setIsDragging(true);

    if (e.touches[0]) {
      updateHue(e.touches[0].clientX);
    }
  }, [updateHue]);

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateHue(e.clientX);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent scrolling during drag
        if (e.touches[0]) {
          updateHue(e.touches[0].clientX);
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
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, updateHue]);

  return {
    handleMouseDown,
    handleTouchStart
  };
};
