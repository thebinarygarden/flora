"use client";
import React from "react";
import {
    ToggleVisButtonMotion,
    LandingTitleMotion,
    ButtonContainerMotion,
    LandingVideoMotion,
    FullPageMinimumMotion
} from "./styles";
import {LoremIpsum} from "../../util/LoremIpsum";
import {BGLandingProps} from "./types";
import {useAnimatedFields} from "@components/bg/BGLanding/useAnimatedFields";
import {useVideoLooper} from "@components/bg/BGLanding/useVideoLooper";
import {useThumbnailScrolling} from "@components/bg/BGLanding/useThumbnailScrolling";
import {IconYoutube} from "@components/icons/IconYoutube";
import {IconGithub} from "@components/icons/IconGithub";
import {IconBGDocs} from "@components/icons/IconBGDocs";
import {IconEyeOff} from "@components/icons/IconEyeOff";
import {IconEyeOn} from "@components/icons/IconEyeOn";
import {useViewportHeight} from "@components/util/client/useViewportHeight";
import {ClientOnlyFadeIn} from "@components/util/client/ClientOnlyFadeIn";
import {IconInfo} from "@components/icons/IconInfo";

export const BGLanding = ({
                              children,
                              title,
                              mp4Path,
                              youtube,
                              bgdocs,
                              github,
    navbar: Navbar
                          }: BGLandingProps) => {
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
    const {showThumbnail, setShowThumbnail} = useThumbnailScrolling({viewportHeight});

    return (
        <ClientOnlyFadeIn>
            {showThumbnail && (
                <>
                    <LandingVideoMotion
                        ref={videoRef}
                        style={{
                            y: thumbnailY,
                            opacity: thumbnailOpacity
                        }} src={mp4Path} muted/>
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
                                <a href={youtube}><IconYoutube unit={unit}/></a>
                                <a href={github}><IconGithub unit={unit}/></a>
                                <a href={bgdocs}><IconBGDocs unit={unit}/></a>
                                <a href={bgdocs}><IconInfo color={"green"} unit={unit}/></a>
                            </ButtonContainerMotion>
                        </>
                    )}
                    <ToggleVisButtonMotion
                        onClick={handleToggle}
                        style={{
                            opacity: buttonsOpacity
                        }}>
                        {isLooping ? <IconEyeOff unit={unit}/> : <IconEyeOn unit={unit}/>}
                    </ToggleVisButtonMotion>
                </>
            )}
            <FullPageMinimumMotion style={{y: showThumbnail ? viewportHeight : 0}}>
                {children}
                <LoremIpsum/>
            </FullPageMinimumMotion>
        </ClientOnlyFadeIn>
    );
};