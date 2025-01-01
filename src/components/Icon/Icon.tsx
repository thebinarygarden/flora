import React, { FC, useState, useEffect } from "react";
import Github from "../../svg/github.svg";
import Youtube from "../../svg/youtube.svg";
import BGDocs from "../../svg/bgdocs.svg";

const icons = {
    github: Github,
    youtube: Youtube,
    bgdocs: BGDocs,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: keyof typeof icons; // Name of the icon (matches the imported SVG filename)
    size?: number; // Optional size override
    color?: string; // Optional color override
}

export const Icon: FC<IconProps> = ({ name, size = 9, color = "currentColor" }) => {
    const IconComponent = icons[name];
    const [height, setHeight] = useState(`${size}vw`);

    useEffect(() => {
        const updateHeight = () => {
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            console.log("isPortrait", isPortrait);
            setHeight(`${size}${isPortrait ? "vw" : "vh"}`);
        };

        updateHeight(); // Set initial height
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [size]);

    if (!IconComponent) {
        console.error(`Icon "${name}" not found.`);
        return null;
    }

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
