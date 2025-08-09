import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    unit?: string;
    size?: number;
    color?: string;
}