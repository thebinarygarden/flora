import {BGNavbar} from "./types";
import {SideNavbarContainer} from "@styles";
import React from "react";

export const SideNavbar:BGNavbar = ({title, }) => {
    return (
        <SideNavbarContainer>
            <div style={{background: "yellow"}}></div>
            <div style={{background: "green"}}></div>
        </SideNavbarContainer>
    );
}