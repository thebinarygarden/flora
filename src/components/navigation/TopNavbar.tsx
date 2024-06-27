import React from "react";

type DefaultNavbarProps = {
    children: React.ReactNode
    title?: string,
    titleElement?: React.ReactNode,
    iconFilepath?: string
    iconElement?: React.ReactNode
    navBarMenuElement?: React.ReactNode
    sidePanelMenuElement?: React.ReactNode
}

export const TopNavbar = ({children}: DefaultNavbarProps) => {
    return(
        <>
            {children}
        </>
    );
}