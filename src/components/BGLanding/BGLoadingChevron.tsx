import {motion, useTransform} from "framer-motion";
import React from "react";
import {BGAnimatedImageProps} from "./types";

export const BGLoadingChevron = ({landingScrollProps}: BGAnimatedImageProps) => {
    const {scrollY, viewportHeight, isScrollLocked} = landingScrollProps;
    const yTransform = useTransform(scrollY, [0, viewportHeight/100], [100, 0]);
    const opacityTransform = useTransform(scrollY, [0, viewportHeight/2], [1, 0]);

    return (
        <motion.div style={{
            position: "absolute",
            width: "20vw",
            height: "4vh",
            left: "50%",
            transform: "translate(-50%, 0)",
            background: "yellow",
            border: "25px solid transparent",
            bottom: yTransform,
        }}
        />
    );
}