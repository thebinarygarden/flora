'use client';
import { useEffect, useState } from 'react';

export interface ViewportInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isPortrait: boolean;
}

export const useViewport = (): ViewportInfo => {
  const [viewportInfo, setViewportInfo] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    isMobile: false,
    isPortrait: false,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;

      // Mobile breakpoint aligned with Tailwind default
      // Mobile: < 768px (below md)
      const isMobile = width < 768;

      setViewportInfo({
        width,
        height,
        isMobile,
        isPortrait,
      });
    };

    // Initial update
    updateViewport();

    // Listen for resize events
    window.addEventListener('resize', updateViewport);
    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  return viewportInfo;
};
