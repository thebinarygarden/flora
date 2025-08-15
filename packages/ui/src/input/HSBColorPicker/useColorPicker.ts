import * as React from 'react';
import { DragType, UseColorPickerProps } from './types';

export const useColorPicker = ({
  value,
  onChange,
  saturation2DRef,
  saturationRef,
  hueRef,
  brightnessRef
}: UseColorPickerProps) => {
  const [isDragging, setIsDragging] = React.useState<DragType | null>(null);

  const handleMouseMove = React.useCallback((type: DragType) => (e: React.MouseEvent | MouseEvent) => {
    if (type === 'saturation-2d' && saturation2DRef.current) {
      const rect = saturation2DRef.current!.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      
      onChange({
        ...value,
        s: Math.round(x * 100),
        b: Math.round((1 - y) * 100)
      });
    } else if (type === 'hue' && hueRef.current) {
      const rect = hueRef.current!.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      onChange({
        ...value,
        h: Math.round(x * 359)
      });
    } else if (type === 'saturation' && saturationRef.current) {
      const rect = saturationRef.current!.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      onChange({
        ...value,
        s: Math.round(x * 100)
      });
    } else if (type === 'brightness' && brightnessRef.current) {
      const rect = brightnessRef.current!.getBoundingClientRect();
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      
      onChange({
        ...value,
        b: Math.round((1 - y) * 100)
      });
    }
  }, [value, onChange, saturation2DRef, saturationRef, hueRef, brightnessRef]);

  const handleMouseDown = React.useCallback((type: DragType) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
    handleMouseMove(type)(e);
  }, [handleMouseMove]);

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

  return {
    handleMouseDown,
    isDragging
  };
};