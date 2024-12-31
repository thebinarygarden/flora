import {useViewportHeight} from "../../hooks/useViewportHeight";
import {useScroll, useTransform} from "framer-motion";
import {useEffect, useRef} from "react";

export const useAnimatedFields = () => {
    const viewportHeight = useViewportHeight();
    const {scrollY} = useScroll();
    const scrollTimeout = useRef<null | NodeJS.Timeout>(null);

    const phase = [0, .1, .5, .9, 1].map(n => n * viewportHeight);
    const thumbnailY = useTransform(scrollY, [0, phase[4]], [0, -100]);
    const thumbnailOpacity = useTransform(scrollY, [0, phase[2]], [1, 0]);
    const contentY = useTransform(scrollY, [0, phase[4]], [phase[4], phase[4]]);

    useEffect(() => {
        if (viewportHeight == 0) return;

        const thresholdScroll = () => {
            if (scrollY.get() < phase[2]) {
                window.scrollTo({top: 0, behavior: 'smooth'})
            } else if (scrollY.get() >= phase[2] && scrollY.get() < viewportHeight) {
                window.scrollTo({top: viewportHeight, behavior: 'smooth'})
            }
        };
        const handleScroll = () => {
            if (scrollTimeout.current != null) {
                clearTimeout(scrollTimeout.current!);
            }
            scrollTimeout.current = setTimeout(thresholdScroll, 500);
        };

        scrollY.on("change", handleScroll)
        return () => {
            scrollY.clearListeners()
        };
    }, [viewportHeight]);

    return {
        thumbnailY,
        thumbnailOpacity,
        contentY
    };
}