import {ReactNode} from "react";
import {BGNavbarProps} from "./components/navigation/types";

export type FloraTheme = {
    primary?: string,
    onPrimary?: string,
    secondary?: string,
    onSecondary?: string,
    background?: string,
    onBackground?: string,
    surface?: string,
    onSurface?: string,
    fontMain?: string,
    fontSecondary?: string,
    fontHeader?: string,
    interpret?: "dark" | "light"
}

export type BGLandingProps = {
    children: ReactNode,
    title: string,
    mp4Path: string,
    youtube: string,
    github: string,
    bgdocs: string,
    navbarConfig: BGNavbarProps
    navbarType: "side" | "top"
}
