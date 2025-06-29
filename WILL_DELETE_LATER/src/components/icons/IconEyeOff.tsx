import React, {FC} from "react";
import EyeOff from './svg/eyeOff.svg';
import IconProps from "@components/icons/IconProps";

export const IconEyeOff: FC<IconProps> = ({size = 9, unit, color = "currentColor" }) => {
    const height = unit ? size+unit : size;
    return (
        <EyeOff
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};