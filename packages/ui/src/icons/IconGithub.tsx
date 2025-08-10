import Github from './svg/github.svg';
import { IconProps } from "./IconProps";

export const IconGithub = ({size = 9, unit, color = "currentColor" }: IconProps) => {
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