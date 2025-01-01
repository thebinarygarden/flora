"use client"
import React, {useState} from "react";
import {motion} from "motion/react";
import {BGLandingProps} from "../../types";
import {ButtonContainer, FullPageMinimum, LandingTitle} from "./styled";
import {useAnimatedFields} from "./useAnimatedFields";
import {LoremIpsum} from "../util/LoremIpsum";
import {ClientOnlyFadeIn} from "../util/ClientOnlyFadeIn";
import {Icon} from "../Icon/Icon";
import {useFloraTheme} from "../../FloraThemeProvider";

export const BGLanding = ({children, title, imagePath, imageAlt, youtube, bgdocs, github}: BGLandingProps) => {
    const {
        thumbnailY,
        thumbnailOpacity,
        titleShadow,
        titleTop,
        titleOpacity,
        buttonsOpacity,
        contentY
    } = useAnimatedFields();
    const theme = useFloraTheme();
    const [titleShadowCustom, setTitleShadowCustom] = useState<string>();

    titleShadow.on('change', (value) => {
        if (value === 0) {
            setTitleShadowCustom("none");
            return;
        }
        setTitleShadowCustom(`${value/3}px ${value/3}px ${value}px ${theme.primary}`)
    })

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
            <ButtonContainer style={{
                opacity: buttonsOpacity
            }}>
                <a href={youtube}><Icon name="youtube"/></a>
                <a href={youtube}><Icon name="github"/></a>
                <a href={youtube}><Icon name="bgdocs"/></a>
            </ButtonContainer>
            <LandingTitle style={{
                top: titleTop,
                opacity: titleOpacity,
                textShadow: titleShadowCustom
            }}>{title}</LandingTitle>
            <motion.div style={{y: contentY}}>
                <FullPageMinimum>
                    {children}
                    <LoremIpsum/>
                </FullPageMinimum>
            </motion.div>
        </ClientOnlyFadeIn>
    );
};