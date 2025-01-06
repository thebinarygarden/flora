import {ReactNode} from "react";
import {BGNavbar} from "./components/navigation/types";

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