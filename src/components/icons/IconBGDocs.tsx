import React, {FC} from "react";
import BGDocs from './svg/bgdocs.svg';
import IconProps from "@components/icons/IconProps";

export const IconBGDocs: FC<IconProps> = ({size = 9, unit, color = "currentColor" }) => {
    const height = unit ? size+unit : size;
    return (
        <BGDocs
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};