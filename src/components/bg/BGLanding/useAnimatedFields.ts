"use client";
import {useScroll, useTransform} from "motion/react";
import {useState} from "react";
import {AnimatedFieldsProps} from "./types";
import {useFloraTheme} from "@components/theme/FloraThemeProvider";

export const useAnimatedFields = ({viewportHeight}: AnimatedFieldsProps) => {
    const theme = useFloraTheme();
    const phase = [0, .1, .5, .9, 1].map(n => n * viewportHeight);
    const {scrollY} = useScroll();

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

    return {
        thumbnailY,
        thumbnailOpacity,
        titleShadow: titleShadowCustom,
        titleTop,
        titleOpacity,
        buttonsOpacity
    };
}