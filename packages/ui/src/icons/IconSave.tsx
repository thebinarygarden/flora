import * as React from "react";
import Save from './svg/save.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconSave = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];

    return (
        <Save
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};
