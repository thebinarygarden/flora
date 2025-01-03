import React, {FC} from "react";
import BGDocs from '../../svg/bgdocs.svg';
import EyeOn from '../../svg/eyeOn.svg';
import EyeOff from '../../svg/eyeOff.svg';
import Github from '../../svg/github.svg';
import Youtube from '../../svg/youtube.svg';

const icons = {
    bgdocs: BGDocs,
    eyeon: EyeOn,
    eyeoff: EyeOff,
    github: Github,
    youtube: Youtube,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: keyof typeof icons; // Name of the icon (matches the imported SVG filename)
    unit?: string;
    size?: number;
    color?: string;
}

export const Icon: FC<IconProps> = ({ name, size = 9, unit, color = "currentColor" }) => {
    const IconComponent = icons[name];
    if (!IconComponent) {
        console.error(`Icon "${name}" not found.`);
        return null;
    }

    const height = unit ? size+unit : size;

    return (
        <IconComponent
            style={{
                color,
                height,
                width: "auto",
            }}
        />
    );
};