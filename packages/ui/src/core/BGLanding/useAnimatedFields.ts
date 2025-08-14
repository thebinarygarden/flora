import {useScroll, useTransform} from "framer-motion";
import {useMemo} from "react";
import {AnimatedFieldsProps} from "./types";
import {useTheme} from "../../theme";

export const useAnimatedFields = ({viewportHeight}: AnimatedFieldsProps) => {
    const {theme} = useTheme()
    const shadowColors = useMemo(() => {
        const lightShadow = `3.5px 3.5px 10px ${theme.background}`;
        const darkShadow = `4px 4px 30px ${theme.onBackground}`;

        return [lightShadow, darkShadow];
    }, [theme.background, theme.onBackground]);

    const phase = useMemo(() =>
        [0, .15, .4, .65, .8].map(n => n * viewportHeight),
        [viewportHeight]
    );
    const {scrollY} = useScroll();

    const thumbnailY = useTransform(scrollY, [0, phase[4]], [0, -100]);
    const thumbnailOpacity = useTransform(scrollY, [0, phase[3]], [1, 0]);
    const titleShadow = useTransform(
        scrollY, 
        [phase[0], phase[2]],
        shadowColors
    );
    const titleTop = useTransform(scrollY, [phase[0], phase[4]], ['50%', '20%']);
    const titleOpacity = useTransform(scrollY, [phase[2], phase[4]], [1, 0]);
    const buttonsOpacity = useTransform(scrollY, [phase[0], phase[1]], [1, 0]);

    return {
        thumbnailY,
        thumbnailOpacity,
        titleShadow,
        titleTop,
        titleOpacity,
        buttonsOpacity
    };
}