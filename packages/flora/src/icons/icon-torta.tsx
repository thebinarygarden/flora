import * as React from 'react';
import Torta from './svg/torta.svg';
import { IconProps, strokeWidthMap } from './icon-props';

export const IconTorta = ({
  size = 9,
  unit,
  color = 'currentColor',
  strokeWidth = 'base',
}: IconProps) => {
  const height = unit ? size + unit : size;
  const strokeWidthValue = strokeWidthMap[strokeWidth];

  return (
    <Torta
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
