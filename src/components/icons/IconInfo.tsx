import React, {FC} from "react";
import Info from './svg/infoicon.svg';
import IconProps from "@components/icons/IconProps";

export const IconInfo: FC<IconProps> = ({size = 9, unit, color = "currentColor" }) => {
    const height = unit ? size+unit : size;
    console.log(Info);
    return (
        <Info
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};