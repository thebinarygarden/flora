import * as React from "react";
import View from './svg/view.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconView = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];
    
    return (
        <View
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};