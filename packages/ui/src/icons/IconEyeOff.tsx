import EyeOff from './svg/eyeOff.svg';
import { IconProps } from "./IconProps";

export const IconEyeOff = ({size = 9, unit, color = "currentColor" }: IconProps) => {
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