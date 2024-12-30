import {FC, ReactNode} from "react";
import {MotionValue} from "framer-motion";

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
    imageAlt: string,
    buttons: FC[]
}