import React from "react";

export  default interface IconProps extends React.SVGProps<SVGSVGElement> {
    unit?: string;
    size?: number;
    color?: string;
}