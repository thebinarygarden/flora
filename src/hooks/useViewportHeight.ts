import { useEffect, useState } from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(0);
    const [unit, setUnit] = useState("vw");

    useEffect(() => {
        setViewportHeight(window.innerHeight);

        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            setUnit(isPortrait ? "vw" : "vh");
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array, runs only once on mount

    return {
        viewportHeight,
        unit
    };
};