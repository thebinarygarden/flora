import * as React from "react";

export type StrokeWidth = 'thinnest' | 'thinner' | 'thin' | 'base' | 'bold' | 'bolder' | 'boldest' | 'rotund';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    unit?: string;
    size?: number;
    color?: string;
    strokeWidth?: StrokeWidth;
}

export const strokeWidthMap = {
    thinnest: 20,
    thinner: 25,
    thin: 30,
    base: 35,
    bold: 40,
    bolder: 45,
    boldest: 50,
    rotund: 55
};