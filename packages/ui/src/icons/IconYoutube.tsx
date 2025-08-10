import Youtube from './svg/youtube.svg';
import { IconProps } from "./IconProps";

export const IconYoutube = ({size = 9, unit, color = "currentColor" }: IconProps) => {
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