import * as React from "react";
import Minus from './svg/minus.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconMinus = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];

    return (
        <Minus
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};
