import * as React from 'react';
import { DragType, UseColorPickerProps } from './types';

export const useColorPicker = ({
  internalHsb,
  handleHsbChange,
  sbGridRef,
  hueRef
}: UseColorPickerProps) => {
  const [isDragging, setIsDragging] = React.useState<DragType | null>(null);

  const updateColor = React.useCallback((type: DragType, clientX: number, clientY: number) => {
    const element = type === 'sb-grid' ? sbGridRef.current : hueRef.current;
    if (!Boolean(element)) return;
    
    const rect = element!.getBoundingClientRect();
    
    if (type === 'sb-grid') {
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      
      const newHsb = {
        h: internalHsb.h,
        s: Math.round(x * 100),
        b: Math.round((1 - y) * 100)
      };
      handleHsbChange(newHsb);
    } else if (type === 'hue') {
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      
      const newHsb = {
        h: Math.round(x * 359),
        s: internalHsb.s,
        b: internalHsb.b
      };
      handleHsbChange(newHsb);
    }
  }, [internalHsb.h, internalHsb.s, internalHsb.b, handleHsbChange, sbGridRef, hueRef]);

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
    handleTouchStart
  };
};