import {RGB} from "../types";
import {ColorPalette} from "./ColorPalette";
import {FC} from "react";

export const BrightnessColorPalette: FC<{ color: RGB }> = ({color}) => {
    const newColors: RGB[] = [];
    const brightnessLevels = [0.8, 0.6, 0.4, 0.2];
    brightnessLevels.forEach((level) => {
        newColors.push({r: color.r*level, g: color.g*level, b: color.b*level});
    });

    return <ColorPalette colors={newColors}/>;
}