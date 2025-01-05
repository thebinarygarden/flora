import React, {FC} from "react";
import Github from './svg/github.svg';
import IconProps from "@components/icons/IconProps";

export const IconGithub: FC<IconProps> = ({size = 9, unit, color = "currentColor" }) => {
    const height = unit ? size+unit : size;
    return (
        <Github
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};