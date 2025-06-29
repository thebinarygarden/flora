import React, {useEffect, useState} from "react";
import {
    AbsolutePositionContainer,
    ColorCopied,
    HEXInformation,
    RGBInformation
} from "./styles";
import {ColorWheelInformation} from "../types";
import {rgbToHex} from "../rgbToHex";

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
        <>
            <HEXInformation size={Math.min(center.x, center.y)} x={center.x} y={center.y}
                            onClick={() => navigator.clipboard.writeText(hexString).then(() => setCopied(hexString))}>{hexString}</HEXInformation>
            <RGBInformation size={Math.min(center.x, center.y)} x={center.x} y={center.y}
                            onClick={() => navigator.clipboard.writeText(rgbString).then(() => setCopied(rgbString))}>{rgbString}</RGBInformation>
            {Boolean(copied) && <ColorCopied color={rgbToHex(color)} x={center.x} y={center.y}
                                    size={Math.min(center.x, center.y)}>Copied<br/> {copied}</ColorCopied>}
        </>
    );
}