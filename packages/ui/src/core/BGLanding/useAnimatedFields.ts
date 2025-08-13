import {useScroll, useTransform} from "framer-motion";
import {useMemo} from "react";
import {AnimatedFieldsProps} from "./types";

export const useAnimatedFields = ({viewportHeight}: AnimatedFieldsProps) => {
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
        ["3.5px 3.5px 10px rgb(2 2 2)", "4px 4px 30px rgb(254 254 254)"]
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