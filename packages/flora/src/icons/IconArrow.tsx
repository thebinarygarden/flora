import * as React from "react";
import Arrow from './svg/arrow.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconArrow = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];
    
    return (
        <Arrow
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};