import BGDocs from './svg/bgdocs.svg';
import { IconProps } from "./IconProps";

export const IconBGDocs = ({size = 9, unit, color = "currentColor" }: IconProps) => {
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