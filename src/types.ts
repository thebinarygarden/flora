import {ReactNode} from "react";

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
    imagePath: string,
    youtube: string,
    github: string,
    bgdocs: string,
}