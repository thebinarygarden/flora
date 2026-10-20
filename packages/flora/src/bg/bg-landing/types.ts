import { ReactNode } from 'react';
import type { HeroProps } from '../../marketing/hero';

export type BGLandingProps = HeroProps & {
  /** fills the hero behind everything: a <video>, an <img>, a gradient… */
  background?: ReactNode;
  /**
   * small controls top right (language, theme, account). They scroll away
   * with the landing; pass the same ones to SiteHeader's actions to bring them
   * back.
   */
  corner?: ReactNode;
};
