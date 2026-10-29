'use client';
import * as React from 'react';
import { Hero } from '../../marketing/hero';
import { BGLandingProps } from './types';

/**
 * A full-screen Hero over a full-bleed background. Scrolling snaps to either
 * the hero or the page below it, and the hero fades out as the page fades in;
 * both are plain CSS (scroll snap and scroll-driven animations).
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
  const cornerRef = React.useRef<HTMLDivElement>(null);
  const [away, setAway] = React.useState(false);

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
    <section className="fl-bgl">
      {corner && (
        <div ref={cornerRef} className="fl-bgl-corner">
          {/* remounted off screen, so a picker left open comes back closed */}
          <React.Fragment key={String(away)}>{corner}</React.Fragment>
        </div>
      )}
      {background && (
        <>
          <div className="fl-bgl-bg">{background}</div>
          <div className="fl-bgl-veil" />
          <div className="fl-bgl-scrim" data-side="" />
          <div className="fl-bgl-scrim" data-bottom="" />
        </>
      )}
      <div className="fl-bgl-content">
        <Hero {...hero} />
      </div>
    </section>
  );
}
