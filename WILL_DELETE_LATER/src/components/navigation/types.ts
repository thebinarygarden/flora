import React, {ReactNode} from "react";

export type BGNavbar = React.FC<BGNavbarProps>;
export type BGNavbarProps = {
    children?: ReactNode,
    title: string,
    navbarList: BGNavbarRow[]
}
export type BGNavbarRow = ReactNode;