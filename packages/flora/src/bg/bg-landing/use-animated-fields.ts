import { RefObject } from 'react';
import { useScroll, useTransform, useMotionTemplate } from 'framer-motion';

/** Scroll-linked fades, measured over the hero's own height. */
export const useAnimatedFields = (ref: RefObject<HTMLElement | null>) => {
  // 0 with the hero's top at the viewport top, 1 once its bottom gets there
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Consolidated single opacity for all hero content
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Scrim expands gradually through first half of the hero
  const sideScrimWidth = useTransform(scrollYProgress, [0, 0.5], [10, 100]);
  const sideScrim = useMotionTemplate`linear-gradient(to right, var(--surface-page) 0%, var(--surface-page) ${sideScrimWidth}%, transparent 100%)`;

  // Bottom scrim rises from 0% to 40% over the whole hero
  const bottomScrimHeight = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const bottomScrim = useMotionTemplate`linear-gradient(to top, var(--surface-page) 0%, transparent ${bottomScrimHeight}%)`;

  return { contentOpacity, sideScrim, bottomScrim };
};
