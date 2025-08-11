"use client";
import { useEffect, useState } from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(0);
    const [unit, setUnit] = useState("vw");

    const setUnitCallback = () => {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        setUnit(isPortrait ? "vw" : "vh");
    };

    useEffect(() => {
        setViewportHeight(window.innerHeight);
        setUnitCallback();

        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setUnitCallback();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        viewportHeight,
        unit
    };
};