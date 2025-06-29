import {ReactNode} from "react";
import {BGNavbar} from "../../navigation/types";

export type BGLandingProps = {
    children: ReactNode,
    title: string,
    mp4Path: string,
    youtube: string,
    github: string,
    bgdocs: string,
    navbar: BGNavbar
}

export type AnimatedFieldsProps = {
    viewportHeight: number
}

export type ThumbnailScrollingProps = {
    viewportHeight: number
}