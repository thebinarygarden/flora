import {useEffect, useRef, useState} from "react";
import {MotionValue} from "framer-motion";

export const useScrollLockEffect = (threshold: number, viewportHeight: number, scrollY: MotionValue<number>  ) => {
    const [isScrollLocked, setIsScrollLocked] = useState<boolean>(false);
    const scrollTimeout = useRef<null | NodeJS.Timeout>(null);
    useEffect(() => {
        const thresholdScroll = () => {
            if (scrollY.get() < threshold) {
                window.scrollTo({top: 0, behavior: 'smooth'})
                setIsScrollLocked(false)
            } else if (scrollY.get() >= threshold && scrollY.get() < viewportHeight) {
                window.scrollTo({top: viewportHeight + 1, behavior: 'smooth'})
                setIsScrollLocked(true)
            }
        };
        const handleScroll = () => {
            if (scrollTimeout.current != null) {
                clearTimeout(scrollTimeout.current);
            }
            scrollTimeout.current = setTimeout(thresholdScroll, 300);
        };

        scrollY.on("change", handleScroll)
        return () => {
            scrollY.clearListeners()
        };
    }, []);

    return isScrollLocked;
}