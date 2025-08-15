import BgLogo from './svg/bgLogo.svg';
import {IconProps, strokeWidthMap} from "./IconProps";

export const IconBGLogo = ({size = 9, unit, color = "currentColor", strokeWidth = "bolder" }: IconProps) => {
    const height = unit ? size+unit : size;
    const strokeWidthValue = strokeWidthMap[strokeWidth];
    
    return (
        <BgLogo
            style={{
                color,
                height,
                width: "auto",
                "--stroke-width": `${strokeWidthValue}px`
            } as React.CSSProperties & { "--stroke-width": string }}
        />
    );
};