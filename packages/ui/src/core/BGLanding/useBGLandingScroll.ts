import {useEffect, useRef, useState} from "react";
import {ThumbnailScrollingProps} from "./types";

export const useBGLandingScroll = ({viewportHeight}: ThumbnailScrollingProps) => {
const SCROLL_SNAP_THRESHOLD = viewportHeight/2;
    const [showThumbnail, setShowThumbnail] = useState(true);
    const scrollTimeout = useRef<null | number>(null);

    useEffect(() => {
        if (viewportHeight == 0) return;

        const scrollLock = () => {
            if (viewportHeight <= window.scrollY) {
                setShowThumbnail(false);
            }
        };
        const resetScroll = () => {
            if (window.scrollY < SCROLL_SNAP_THRESHOLD) {
                window.scrollTo({top: 0, behavior: 'smooth'});
            } else if (window.scrollY >= SCROLL_SNAP_THRESHOLD && window.scrollY < viewportHeight) {
                window.scrollTo({top: viewportHeight+1, behavior: 'smooth'});
            }
        };
        const handleScroll = () => {
            if (scrollTimeout.current !== null) {
                clearTimeout(scrollTimeout.current!);
            }
            if(showThumbnail) {
                scrollLock();
                scrollTimeout.current = setTimeout(resetScroll, 500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [viewportHeight, showThumbnail]);

    useEffect(() => {
        if(!showThumbnail) {
            window.scrollTo({top: window.scrollY - viewportHeight, behavior: "instant"});
        }
    }, [showThumbnail]);

    return {
        showThumbnail,
        setShowThumbnail
    };
}