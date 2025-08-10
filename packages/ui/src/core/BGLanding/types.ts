import {ReactNode} from "react";

export type BGLandingProps = {
    children: ReactNode,
    title: string,
    mp4Path: string,
    youtube: string,
    github: string,
    bgdocs: string,
}

export type AnimatedFieldsProps = {
    viewportHeight: number
}

export type ThumbnailScrollingProps = {
    viewportHeight: number
}