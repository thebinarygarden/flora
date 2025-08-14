import {useEffect, useRef, useState} from "react";
import {ThumbnailScrollingProps} from "./types";

export const useBGLandingScroll = ({viewportHeight}: ThumbnailScrollingProps) => {
const SCROLL_SNAP_THRESHOLD = viewportHeight/2;
    const [showThumbnail, setShowThumbnail] = useState(true);
    const scrollTimeout = useRef<null | number>(null);

    // Set up scroll event handling
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

    useEffect(() => {
        if (viewportHeight == 0) return;

        // Handle scroll position adjustment when thumbnail state changes
        if(!showThumbnail) {
            window.scrollTo({top: window.scrollY - viewportHeight, behavior: "instant"});
        }

        // Apply conditional overscroll behavior and document height manipulation
        document.body.style.overscrollBehaviorX = showThumbnail ? 'none' : 'auto';
        document.body.style.minHeight = showThumbnail 
            ? `${2*viewportHeight}px`
            : `${viewportHeight}px`;

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overscrollBehaviorX = 'auto';
            document.body.style.minHeight = `${viewportHeight}px`;
        };
    }, [viewportHeight, showThumbnail]);

    return {
        showThumbnail,
        setShowThumbnail
    };
}