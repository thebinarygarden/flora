'use client';
import { RefObject, useEffect, useRef } from 'react';

/**
 * When scrolling stops inside the hero, finish the move: back to the top if
 * less than halfway, otherwise to the hero's bottom edge.
 */
export const useBGLandingScroll = (ref: RefObject<HTMLElement | null>) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Only act if scroll is inside the hero
      const heroHeight = ref.current?.offsetHeight ?? 0;
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0 && currentScrollY < heroHeight) {
        timeoutRef.current = window.setTimeout(() => {
          const targetScroll = currentScrollY < heroHeight / 2 ? 0 : heroHeight;
          const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;

          window.scrollTo({
            top: targetScroll,
            behavior: reduce ? 'auto' : 'smooth',
          });
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [ref]);
};
