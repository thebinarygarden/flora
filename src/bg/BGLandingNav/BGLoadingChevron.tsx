import {MotionValue, motion, useTransform} from "framer-motion";
import React from "react";
import {BGLandingScrollProps} from "./BGLandingNav";

type BGAnimatedImageProps = {
    landingScrollProps: BGLandingScrollProps,
}

export const BGLoadingChevron = ({landingScrollProps}: BGAnimatedImageProps) => {
    const {scrollY, viewportHeight, isScrollLocked} = landingScrollProps;

    const yTransform = useTransform(scrollY, [0, viewportHeight], [0, -100]);
    const opacityTransform = useTransform(scrollY, [0, viewportHeight/2], [1, 0]);



    return (
        <motion.div style={{
            position: "fixed",
            width: "20vw",
            height: "10vh",
            objectPosition: "center",
            top: yTransform,
            opacity: opacityTransform
        }} />
    );
}