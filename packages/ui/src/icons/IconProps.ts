import * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    unit?: string;
    size?: number;
    color?: string;
    strokeWidth?: 'thinnest' | 'thinner' | 'thin' | 'base' | 'bold' | 'bolder' | 'boldest';
}

export const strokeWidthMap = {
    thinnest: 15,
    thinner: 20,
    thin: 25,
    base: 30,
    bold: 35,
    bolder: 40,
    boldest: 45
};