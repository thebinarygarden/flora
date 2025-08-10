import EyeOn from './svg/eyeOn.svg';
import { IconProps } from "./IconProps";

export const IconEyeOn = ({size = 9, unit, color = "currentColor" }: IconProps) => {
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