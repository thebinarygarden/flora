import { ReactNode, ComponentType } from 'react';
import { NavigationComponentProps, NavItem } from '../../navigation';

export type BGLandingProps = {
  children: ReactNode;
  title: string;
  description: string;
  mp4Path: string;
  youtube: string;
  github: string;
  bgdocs: string;
  navigationComponent?: ComponentType<NavigationComponentProps>;
  navigationItems?: NavItem[];
  onBrandClick?: () => void;
};

export type AnimatedFieldsProps = {
  viewportHeight: number;
};
