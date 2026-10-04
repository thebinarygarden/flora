import { ReactNode } from 'react';
import type { HeroProps } from '../../marketing/Hero';

export type BGLandingProps = HeroProps & {
  /** fills the hero behind everything: a <video>, an <img>, a gradient… */
  background?: ReactNode;
};
