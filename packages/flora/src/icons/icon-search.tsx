import * as React from 'react';
import Search from './svg/search.svg';
import { IconProps, strokeWidthMap } from './icon-props';

export const IconSearch = ({
  size = 9,
  unit,
  color = 'currentColor',
  strokeWidth = 'base',
}: IconProps) => {
  const height = unit ? size + unit : size;
  const strokeWidthValue = strokeWidthMap[strokeWidth];

  return (
    <Search
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
