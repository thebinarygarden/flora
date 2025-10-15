import * as React from 'react';
import Arrow from './svg/arrow.svg';
import { IconProps, strokeWidthMap } from './IconProps';

export type Orientation = 'up' | 'down' | 'left' | 'right';

export interface IconArrowProps extends IconProps {
  orientation?: Orientation;
}

const rotationMap: Record<Orientation, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

export const IconArrow = ({
  size = 9,
  unit,
  color = 'currentColor',
  strokeWidth = 'base',
  orientation = 'up',
}: IconArrowProps) => {
  const height = unit ? size + unit : size;
  const strokeWidthValue = strokeWidthMap[strokeWidth];
  const rotation = rotationMap[orientation];

  return (
    <Arrow
      style={
        {
          color,
          height,
          width: 'auto',
          transform: `rotate(${rotation}deg)`,
          '--stroke-width': `${strokeWidthValue}px`,
        } as React.CSSProperties & { '--stroke-width': string }
      }
    />
  );
};
