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

export const ColorWheelInformation = ({color, size}: ColorWheelInformation) => {
    const [copied, setCopied] = useState(false);
    const rgbString = `${color.r}, ${color.g}, ${color.b}`;
    const hexString = rgbToHex(color);

    useEffect(() => {
        if(copied){
            console.log("loopped")
            setTimeout(() => {setCopied(false)}, 1000);
        }
    }, [copied]);

    return (
        <AbsolutePositionContainer>
            <HEXInformation onClick={()=> navigator.clipboard.writeText(hexString).then(() => setCopied(true))}>{hexString}</HEXInformation>
            <RGBInformation onClick={()=> navigator.clipboard.writeText(rgbString).then(() => setCopied(true))}>{rgbString}</RGBInformation>
            {copied && <ColorCopied $r={color.r} $g={color.g} $b={color.b} size={size}>COPIED</ColorCopied>}
        </AbsolutePositionContainer>
    );
}