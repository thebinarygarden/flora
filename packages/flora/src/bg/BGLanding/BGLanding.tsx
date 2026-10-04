'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../marketing/Hero';
import { BGLandingProps } from './types';
import { useAnimatedFields } from './useAnimatedFields';
import { useBGLandingScroll } from './useBGLandingScroll';

/**
 * A full-screen Hero over a full-bleed background. Scrolling snaps to either
 * the hero or the page below it, so the reader never rests halfway between.
 * Takes every Hero prop, plus `background`.
 *
 * ```tsx
 * <BGLanding
 *   title={<>open source, <em>for humans.</em></>}
 *   background={<video src="/loop.mp4" autoPlay muted loop playsInline />}
 * />
 * ```
 */
export function BGLanding({ background, ...hero }: BGLandingProps) {
  const ref = React.useRef<HTMLElement>(null);
  const { contentOpacity, sideScrim, bottomScrim } = useAnimatedFields(ref);

  // Auto-scroll behavior to prevent getting stuck between sections
  useBGLandingScroll(ref);

  return (
    <section ref={ref} className="fl-bgl">
      {background && (
        <>
          <div className="fl-bgl-bg">{background}</div>
          <motion.div
            className="fl-bgl-scrim"
            style={{ background: sideScrim }}
          />
          <motion.div
            className="fl-bgl-scrim"
            style={{ background: bottomScrim }}
          />
        </>
      )}
      <motion.div
        className="fl-bgl-content"
        style={{ opacity: contentOpacity }}
      >
        <Hero {...hero} />
      </motion.div>
    </section>
  );
}
