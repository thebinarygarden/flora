import Info from './svg/infoicon.svg';
import { IconProps } from "./IconProps";

export const IconInfo = ({size = 9, unit, color = "currentColor" }: IconProps) => {
    const height = unit ? size+unit : size;

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