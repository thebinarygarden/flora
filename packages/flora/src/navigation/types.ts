import { ReactNode } from 'react';
import { MotionValue } from 'framer-motion';

export type NavItem = {
  label: string;
  onClick: () => void;
};

// Common navigation interface that all nav components must implement
export interface NavigationComponentProps {
  brand: ReactNode;
  items: NavItem[];
  onBrandClick: () => void;
  navOpacity?: MotionValue<number>;
}
