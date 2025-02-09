import {RGB} from "./types";

export const rgbToHex = (color: RGB): string => {
    return `#${((1 << 24) | (color.r << 16) | (color.g << 8) | color.b).toString(16).slice(1).toUpperCase()}`;
};