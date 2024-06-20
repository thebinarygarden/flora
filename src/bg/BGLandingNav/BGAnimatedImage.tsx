import {MotionValue, motion, useTransform} from "framer-motion";
import React from "react";

type BGAnimatedImageProps = {
    imagePath: string,
    imageAlt?: string,
    scrollY: MotionValue<number>,
    viewportHeight: number
    isScrollLocked: boolean
}

export const BGAnimatedImage = ({imagePath, imageAlt, scrollY, viewportHeight}: BGAnimatedImageProps) => {
    const yTransform = useTransform(scrollY, [0, viewportHeight], [0, -100]);
    const opacityTransform = useTransform(scrollY, [0, 2/3*viewportHeight], [1, 0]);
    return (
        <motion.img style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -1,
            top: yTransform,
            opacity: opacityTransform
        }} src={imagePath} alt={imageAlt ?? ""} />
    );
}