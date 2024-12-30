import React from "react";
import {ButtonContainer, LandingTitle} from "./styled";
import {FullPageLandingProps} from "./types";
import {motion, useTransform} from "framer-motion";

export const FullPageImageLanding = ({title, imagePath, imageAlt, buttons, landingScrollProps}: FullPageLandingProps) => {
    const {scrollY, viewportHeight, isScrollLocked} = landingScrollProps;
    const yTransform = useTransform(scrollY, [0, viewportHeight], [0, -100]);
    const opacityTransform = useTransform(scrollY, [0, viewportHeight/2], [1, 0]);
    return (
        <>
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
            <ButtonContainer>
                {buttons?.map((ButtonComponent, index) => (
                    <ButtonComponent key={index} />
                ))}
            </ButtonContainer>
            <LandingTitle>{title}</LandingTitle>
        </>
    );
};