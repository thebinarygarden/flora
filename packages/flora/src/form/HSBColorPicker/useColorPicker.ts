import * as React from 'react';
import { DragType, UseColorPickerProps } from './types';

const MAX_HUE = 359;
const MAX_PERCENTAGE = 100;

export const useColorPicker = ({
  internalHsb,
  handleHsbChange,
  sbGridRef,
  hueRef,
  saturationRef,
  brightnessRef,
}: UseColorPickerProps) => {
  const [isDragging, setIsDragging] = React.useState<DragType | null>(null);

  const updateColor = React.useCallback(
    (type: DragType, clientX: number, clientY: number) => {
      let element: HTMLDivElement | null = null;

      switch (type) {
        case 'sb-grid':
          element = sbGridRef?.current ?? null;
          break;
        case 'hue':
          element = hueRef?.current ?? null;
          break;
        case 'saturation':
          element = saturationRef?.current ?? null;
          break;
        case 'brightness':
          element = brightnessRef?.current ?? null;
          break;
      }

      if (!element) return;

      const rect = element.getBoundingClientRect();

      if (type === 'sb-grid') {
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

        const newHsb = {
          h: internalHsb.h,
          s: Math.round(x * MAX_PERCENTAGE),
          b: Math.round((1 - y) * MAX_PERCENTAGE),
        };
        handleHsbChange(newHsb);
      } else if (type === 'hue') {
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

        const newHsb = {
          h: Math.round(x * MAX_HUE),
          s: internalHsb.s,
          b: internalHsb.b,
        };
        handleHsbChange(newHsb);
      } else if (type === 'saturation') {
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

        const newHsb = {
          h: internalHsb.h,
          s: Math.round(x * MAX_PERCENTAGE),
          b: internalHsb.b,
        };
        handleHsbChange(newHsb);
      } else if (type === 'brightness') {
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

        const newHsb = {
          h: internalHsb.h,
          s: internalHsb.s,
          b: Math.round(x * MAX_PERCENTAGE),
        };
        handleHsbChange(newHsb);
      }
    },
    [
      internalHsb.h,
      internalHsb.s,
      internalHsb.b,
      handleHsbChange,
      sbGridRef,
      hueRef,
      saturationRef,
      brightnessRef,
    ]
  );

  const handleMouseDown = React.useCallback(
    (type: DragType) => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(type);

      updateColor(type, e.clientX, e.clientY);
    },
    [updateColor]
  );

  const handleTouchStart = React.useCallback(
    (type: DragType) => (e: React.TouchEvent) => {
      setIsDragging(type);

      if (e.touches[0]) {
        updateColor(type, e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updateColor]
  );

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
  }, [isDragging, updateColor]);

  return {
    handleMouseDown,
    handleTouchStart,
  };
};
