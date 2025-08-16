import * as React from "react";
import BGDocs from './svg/bgDocs.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconBGDocs = ({size = 9, unit, color = "currentColor", strokeWidth = "base" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];
    
    return (
        <BGDocs
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};