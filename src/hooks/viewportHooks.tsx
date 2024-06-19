import {useEffect, useState} from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    useEffect(() => {
        //console.log("viewportHeight changed: {}", viewportHeight);
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerHeight]);

    return viewportHeight;
}