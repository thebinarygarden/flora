import {useRef} from "react";

export type BGColorWheelProps = {
    currentColor: RGB,
    setCurrentColor: (RGB) => void
}

export type RGB = {
    r: number,
    g: number,
    b: number
}

export type Coordinates = {
    x: number,
    y: number
}

export type ColorWheelDialProps = {
    center: Coordinates,
    coordinateToRGB: Map<string, RGB>,
    containerRef: useRef<HTMLDivElement | null>,
    currentColor: RGB;
    setCurrentColor: (RGB) => void;
}

export type ColorWheelInformation = {
    color: RGB,
    center: Coordinates
}

export type ColorPaletteProps = {
    colors: RGB[],
    vertical?: boolean
}