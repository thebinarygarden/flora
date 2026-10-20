'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../marketing/hero';
import { BGLandingProps } from './types';
import { useAnimatedFields } from './use-animated-fields';
import { useBGLandingScroll } from './use-bg-landing-scroll';

/**
 * A full-screen Hero over a full-bleed background. Scrolling snaps to either
 * the hero or the page below it, so the reader never rests halfway between.
 * Takes every Hero prop, plus `background` and `corner`.
 *
 * ```tsx
 * <BGLanding
 *   title={<>open source, <em>for humans.</em></>}
 *   background={<video src="/loop.mp4" autoPlay muted loop playsInline />}
 *   corner={<ThemeToggleButton />}
 * />
 * ```
 */
export function BGLanding({ background, corner, ...hero }: BGLandingProps) {
  const ref = React.useRef<HTMLElement>(null);
  const cornerRef = React.useRef<HTMLDivElement>(null);
  const [away, setAway] = React.useState(false);
  const { contentOpacity, sideScrim, bottomScrim } = useAnimatedFields(ref);

  // Auto-scroll behavior to prevent getting stuck between sections
  useBGLandingScroll(ref);

  React.useEffect(() => {
    const el = cornerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setAway(!entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="fl-bgl">
      {corner && (
        <div ref={cornerRef} className="fl-bgl-corner">
          {/* remounted off screen, so a picker left open comes back closed */}
          <React.Fragment key={String(away)}>{corner}</React.Fragment>
        </div>
      )}
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
