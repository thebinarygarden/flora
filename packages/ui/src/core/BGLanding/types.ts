import {ReactNode, ComponentType} from "react";
import {NavigationComponentProps, NavItem} from "../../navigation";

export type BGLandingProps = {
    children: ReactNode,
    title: string,
    mp4Path: string,
    youtube: string,
    github: string,
    bgdocs: string,
    navigationComponent?: ComponentType<NavigationComponentProps>;
    navigationItems?: NavItem[];
    onNavigationItemClick?: (item: NavItem) => void;
}

export type AnimatedFieldsProps = {
    viewportHeight: number
}

export type ThumbnailScrollingProps = {
    viewportHeight: number
}