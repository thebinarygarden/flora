import * as React from "react";
import EyeDropper from './svg/eyeDropper.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconEyeDropper = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];

    return (
        <EyeDropper
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};