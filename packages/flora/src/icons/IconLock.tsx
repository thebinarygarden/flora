import * as React from 'react';
import Lock from './svg/lock.svg';
import { IconProps, strokeWidthMap } from './IconProps';

export const IconLock = ({
  size = 9,
  unit,
  color = 'currentColor',
  strokeWidth = 'base',
}: IconProps) => {
  const height = unit ? size + unit : size;
  const strokeWidthValue = strokeWidthMap[strokeWidth];

  return (
    <Lock
      style={
        {
          color,
          height,
          width: 'auto',
          '--stroke-width': `${strokeWidthValue}px`,
        } as React.CSSProperties & { '--stroke-width': string }
      }
    />
  );
};
