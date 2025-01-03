import {useViewportHeight} from "../../hooks/useViewportHeight";
import {useScroll, useTransform} from "motion/react";
import {useEffect, useRef, useState} from "react";
import {useFloraTheme} from "../../FloraThemeProvider";

export const useAnimatedFields = () => {
    const viewportHeight = useViewportHeight();
    const theme = useFloraTheme();
    
    const {scrollY} = useScroll();
    const scrollTimeout = useRef<null | number>(null);
    const phase = [0, .1, .5, .9, 1].map(n => n * viewportHeight);

    const thumbnailY = useTransform(scrollY, [0, phase[4]], [0, -100]);
    const thumbnailOpacity = useTransform(scrollY, [0, phase[2]], [1, 0]);
    
    const titleShadow = useTransform(scrollY, [phase[0], phase[2]], [10, 0]);
    const [titleShadowCustom, setTitleShadowCustom] = useState<string>();
    titleShadow.on('change', (value) => {
        if (value === 0) {
            setTitleShadowCustom("none");
            return;
        }
        setTitleShadowCustom(`${value / 3}px ${value / 3}px ${value}px ${theme.primary}`)
    })
    const titleTop = useTransform(scrollY, [phase[1], phase[3]], ['50%', '90%']);
    const titleOpacity = useTransform(scrollY, [phase[2], phase[3]], [1, 0]);
    const buttonsOpacity = useTransform(scrollY, [phase[0], phase[1]], [1, 0]);
    const contentY = useTransform(scrollY, [0, phase[4]], [phase[4], phase[4]]);

    useEffect(() => {
        if (viewportHeight == 0) return;

        const resetScroll = () => {
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
            scrollTimeout.current = setTimeout(resetScroll, 500);
        };

        scrollY.on("change", handleScroll)
        return () => {
            scrollY.clearListeners()
        };
    }, [viewportHeight]);

    return {
        thumbnailY,
        thumbnailOpacity,
        titleShadow: titleShadowCustom,
        titleTop,
        titleOpacity,
        buttonsOpacity,
        contentY
    };
}