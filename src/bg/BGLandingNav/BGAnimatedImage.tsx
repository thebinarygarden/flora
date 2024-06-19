import {MotionValue, motion, useTransform} from "framer-motion";
import React from "react";

type BGAnimatedImageProps = {
    imagePath: string,
    imageAlt?: string,
    scrollY: MotionValue<number>,
    viewportHeight: number
}

export const BGAnimatedImage = ({imagePath, imageAlt, scrollY, viewportHeight}: BGAnimatedImageProps) => {
    const yTransform = useTransform(scrollY, [0, viewportHeight], [0, -100]);

    return (
        <motion.img style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -1,
            top: yTransform
        }} src={imagePath} alt={imageAlt ?? ""} />
    );
}