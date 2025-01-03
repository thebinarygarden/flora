"use client"
import React from "react";
import {motion} from "motion/react";
import {BGLandingProps} from "../../types";
import {ToggleVisButtonMotion, FullPageMinimum, LandingTitleMotion, ButtonContainerMotion} from "./styled";
import {useAnimatedFields} from "./useAnimatedFields";
import {LoremIpsum} from "../util/LoremIpsum";
import {ClientOnlyFadeIn} from "../util/ClientOnlyFadeIn";
import {Icon} from "../Icon/Icon";
import {useVideoLooper} from "./useVideoLooper";
import {useViewportHeight} from "../../hooks/useViewportHeight";

export const BGLanding = ({children, title, imagePath, youtube, bgdocs, github}: BGLandingProps) => {

    const {unit, viewportHeight} = useViewportHeight();
    const {
        thumbnailY,
        thumbnailOpacity,
        titleShadow,
        titleTop,
        titleOpacity,
        buttonsOpacity
    } = useAnimatedFields({viewportHeight});
    const {videoRef, isLooping, handleToggle} = useVideoLooper();

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
                        textShadow: titleShadow
                    }}>{title}</LandingTitleMotion>
                    <ButtonContainerMotion style={{
                        opacity: buttonsOpacity
                    }}>
                        <a href={youtube}><Icon name="youtube" unit={unit}/></a>
                        <a href={github}><Icon name="github" unit={unit}/></a>
                        <a href={bgdocs}><Icon name="bgdocs" unit={unit}/></a>
                    </ButtonContainerMotion>
                </>
            )}
            <ToggleVisButtonMotion
                onClick={handleToggle}
                style={{
                    opacity: buttonsOpacity
                }}>
                {isLooping ? <Icon name="eyeoff" unit={unit}/> : <Icon name="eyeon" unit={unit}/>}
            </ToggleVisButtonMotion>
            <motion.div style={{y: innerHeight}}>
                <FullPageMinimum>
                    {children}
                    <LoremIpsum/>
                </FullPageMinimum>
            </motion.div>
        </ClientOnlyFadeIn>
    );
};