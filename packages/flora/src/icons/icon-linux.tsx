import * as React from 'react';
import Linux from './svg/linux.svg';
import { IconProps, strokeWidthMap } from './icon-props';

export const IconLinux = ({
  size = 9,
  unit,
  color = 'currentColor',
  strokeWidth = 'base',
}: IconProps) => {
  const height = unit ? size + unit : size;
  const strokeWidthValue = strokeWidthMap[strokeWidth];

  return (
    <Linux
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
