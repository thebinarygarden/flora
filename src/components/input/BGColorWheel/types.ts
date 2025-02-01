import {useRef} from "react";

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
    size: number,
    coordinateToRGB: Map<string, RGB>,
    containerRef: useRef<HTMLDivElement | null>
}