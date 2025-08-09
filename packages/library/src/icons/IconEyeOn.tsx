import React, {FC} from "react";
import EyeOn from './svg/eyeOn.svg';
import { IconProps } from "./IconProps";

export const IconEyeOn: FC<IconProps> = ({size = 9, unit, color = "currentColor" }) => {
    const height = unit ? size+unit : size;
    return (
        <EyeOn
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};