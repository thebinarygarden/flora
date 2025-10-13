import * as React from "react";
import PaintBrush from './svg/paintBrush.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconPaintBrush = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];

    return (
        <PaintBrush
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};