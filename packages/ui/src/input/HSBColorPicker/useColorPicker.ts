import * as React from 'react';
import { DragType, UseColorPickerProps } from './types';

export const useColorPicker = ({
  internalHsb,
  handleHsbChange,
  saturation2DRef,
  hueRef
}: UseColorPickerProps) => {
  const [isDragging, setIsDragging] = React.useState<DragType | null>(null);

  const updateColor = React.useCallback((type: DragType, clientX: number, clientY: number) => {
    if (type === 'saturation-2d' && saturation2DRef.current) {
      const rect = saturation2DRef.current!.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      
      handleHsbChange({
        ...internalHsb,
        s: Math.round(x * 100),
        b: Math.round((1 - y) * 100)
      });
    } else if (type === 'hue' && hueRef.current) {
      const rect = hueRef.current!.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      
      handleHsbChange({
        ...internalHsb,
        h: Math.round(x * 359)
      });
    }
  }, [internalHsb, handleHsbChange, saturation2DRef, hueRef]);

  const handleMouseDown = React.useCallback((type: DragType) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
    updateColor(type, e.clientX, e.clientY);
  }, [updateColor]);

  const handleTouchStart = React.useCallback((type: DragType) => (e: React.TouchEvent) => {
    setIsDragging(type);
    if (e.touches[0]) {
      updateColor(type, e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [updateColor]);

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateColor(isDragging, e.clientX, e.clientY);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent scrolling during drag
        if (e.touches[0]) {
          updateColor(isDragging, e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(null);
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(null);
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
  }, [isDragging, updateColor]);

  return {
    handleMouseDown,
    handleTouchStart,
    isDragging
  };
};