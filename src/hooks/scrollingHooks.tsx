import {useEffect, useState} from "react";
import {MotionValue} from "framer-motion";

export const useScrollLockEffect = (threshold: number, viewportHeight: number, scrollY: MotionValue<number>  ) => {
    const [scrollTimeout, setScrollTimeout] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        const thresholdScroll = () => {
            if (scrollY.get() < threshold) {
                window.scrollTo({top: 0, behavior: 'smooth'})
            } else if (scrollY.get() >= threshold && scrollY.get() < viewportHeight) {
                window.scrollTo({top: viewportHeight + 1, behavior: 'smooth'})
            }
        };
        const handleScroll = () => {
            // console.log("scroll changed: {}" , scrollY.get());
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            setScrollTimeout(setTimeout(thresholdScroll, 300));
        };
        scrollY.on("change", handleScroll)
        return () => scrollY.clearListeners();
    }, [scrollY, viewportHeight, scrollTimeout]);
}