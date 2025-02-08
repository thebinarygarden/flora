import React, {useEffect, useState} from "react";
import {
    AbsolutePositionContainer, ColorCopied,
    HEXInformation,
    RGBInformation
} from "./styles";
import {ColorWheelInformation, RGB} from "./types";


const rgbToHex = (color: RGB): string => {
    return `#${((1 << 24) | (color.r << 16) | (color.g << 8) | color.b).toString(16).slice(1).toUpperCase()}`;
};

export const ColorWheelInformation = ({color, center}: ColorWheelInformation) => {
    const [copied, setCopied] = useState<string | undefined>(undefined);
    const rgbString = `${color.r}, ${color.g}, ${color.b}`;
    const hexString = rgbToHex(color);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(undefined)
            }, 1000);
        }
    }, [copied]);

    return (
        <AbsolutePositionContainer>
            <HEXInformation size={Math.min(center.x, center.y)} x={center.x} y={center.y}
                            onClick={() => navigator.clipboard.writeText(hexString).then(() => setCopied(hexString))}>{hexString}</HEXInformation>
            <RGBInformation size={Math.min(center.x, center.y)} x={center.x} y={center.y}
                            onClick={() => navigator.clipboard.writeText(rgbString).then(() => setCopied(rgbString))}>{rgbString}</RGBInformation>
            {Boolean(copied) && <ColorCopied $r={color.r} $g={color.g} $b={color.b} x={center.x} y={center.y}
                                    size={Math.min(center.x, center.y)}>Copied<br/> {copied}</ColorCopied>}
        </AbsolutePositionContainer>
    );
}