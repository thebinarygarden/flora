import { useEffect, useState } from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        setViewportHeight(window.innerHeight);

        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array, runs only once on mount

    return viewportHeight;
};