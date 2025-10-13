import * as React from "react";
import Hide from './svg/hide.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconHide = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];
    
    return (
        <Hide
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};