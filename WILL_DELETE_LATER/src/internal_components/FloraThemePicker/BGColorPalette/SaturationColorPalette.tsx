import { RGB } from "../types";
import { ColorPalette } from "./ColorPalette";
import { FC } from "react";

export const SaturationColorPalette: FC<{ color: RGB }> = ({ color }) => {
    const newColors: RGB[] = [];

    function reduceSaturation(rgb: RGB, factor: number): RGB {
        const maxVal = Math.max(rgb.r, rgb.g, rgb.b);

        return {
            r: rgb.r + (maxVal - rgb.r) * (1 - factor),
            g: rgb.g + (maxVal - rgb.g) * (1 - factor),
            b: rgb.b + (maxVal - rgb.b) * (1 - factor),
        };
    }

    // Generate colors with decreasing saturation
    const saturationLevels = [0.8, 0.6, 0.4, 0.2];
    saturationLevels.forEach((level) => {
        newColors.push(reduceSaturation(color, level));
    });

    return <ColorPalette colors={newColors} />;
};