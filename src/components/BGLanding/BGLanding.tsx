"use client"
import React from "react";
import {motion} from "motion/react";
import {BGLandingProps} from "../../types";
import {ButtonContainer, FullPageMinimum, LandingTitle} from "./styled";
import {useAnimatedFields} from "./useAnimatedFields";
import {LoremIpsum} from "../util/LoremIpsum";
import {ClientOnlyFadeIn} from "../util/ClientOnlyFadeIn";

export const BGLanding = ({children, title, imagePath, imageAlt, buttons}: BGLandingProps) => {
    const {thumbnailY, thumbnailOpacity, titleY, contentY} = useAnimatedFields();

    return (
        <ClientOnlyFadeIn>
            <motion.img style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
                zIndex: -1,
                y: thumbnailY,
                opacity: thumbnailOpacity
            }} src={imagePath} alt={imageAlt ?? ""}/>
            <ButtonContainer>
                {buttons?.map((ButtonComponent, index) => (
                    <ButtonComponent key={index}/>
                ))}
            </ButtonContainer>
            <LandingTitle style={{top: titleY}}>{title}</LandingTitle>
            <motion.div style={{y: contentY}}>
                <FullPageMinimum>
                    {children}
                    <LoremIpsum />
                </FullPageMinimum>
            </motion.div>
        </ClientOnlyFadeIn>
    );
};