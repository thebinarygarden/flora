"use client"
import React, {useState} from "react";
import {motion} from "motion/react";
import {BGLandingProps} from "../../types";
import {ToggleVisButtonMotion, FullPageMinimum, LandingTitleMotion, ButtonContainerMotion} from "./styled";
import {useAnimatedFields} from "./useAnimatedFields";
import {LoremIpsum} from "../util/LoremIpsum";
import {ClientOnlyFadeIn} from "../util/ClientOnlyFadeIn";
import {Icon} from "../Icon/Icon";
import {useFloraTheme} from "../../FloraThemeProvider";
import {useVideoLooper} from "./useVideoLooper";

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
    const {videoRef, isLooping, handleToggle} = useVideoLooper();
    const theme = useFloraTheme();
    const [titleShadowCustom, setTitleShadowCustom] = useState<string>();

    titleShadow.on('change', (value) => {
        if (value === 0) {
            setTitleShadowCustom("none");
            return;
        }
        setTitleShadowCustom(`${value / 3}px ${value / 3}px ${value}px ${theme.primary}`)
    })

    return (
        <ClientOnlyFadeIn>
            <motion.video
                ref={videoRef}
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    objectPosition: "center",
                    zIndex: -1,
                    y: thumbnailY,
                    opacity: thumbnailOpacity
                }} src={imagePath} muted/>
            {!isLooping && (
                <>
                    <LandingTitleMotion style={{
                        top: titleTop,
                        opacity: titleOpacity,
                        textShadow: titleShadowCustom
                    }}>{title}</LandingTitleMotion>
                    <ButtonContainerMotion style={{
                        opacity: buttonsOpacity
                    }}>
                        <a href={youtube}><Icon name="youtube"/></a>
                        <a href={github}><Icon name="github"/></a>
                        <a href={bgdocs}><Icon name="bgdocs"/></a>
                    </ButtonContainerMotion>
                </>
            )}
            <ToggleVisButtonMotion
                onClick={handleToggle}
                style={{
                    opacity: buttonsOpacity
                }}>
                {isLooping ? <Icon name="eyeoff"/> : <Icon name="eyeon"/>}
            </ToggleVisButtonMotion>
            <motion.div style={{y: contentY}}>
                <FullPageMinimum>
                    {children}
                    <LoremIpsum/>
                </FullPageMinimum>
            </motion.div>
        </ClientOnlyFadeIn>
    );
};