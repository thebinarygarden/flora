import React, {FC} from "react";
import Youtube from './svg/youtube.svg';
import { IconProps } from "./IconProps";

export const IconYoutube: FC<IconProps> = ({size = 9, unit, color = "currentColor" }) => {
    const height = unit ? size+unit : size;
    return (
        <Youtube
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};