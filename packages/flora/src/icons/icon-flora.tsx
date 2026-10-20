import * as React from 'react';
import Flora from './svg/flora.svg';
import { IconProps, strokeWidthMap } from './icon-props';

export const IconFlora = ({
  size = 9,
  unit,
  color = 'currentColor',
  strokeWidth = 'base',
}: IconProps) => {
  const height = unit ? size + unit : size;
  const strokeWidthValue = strokeWidthMap[strokeWidth];

  return (
    <Flora
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
