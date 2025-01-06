import React from "react";
import {motion} from "motion/react";
import {ToggleVisButtonMotion, FullPageMinimum, LandingTitleMotion, ButtonContainerMotion} from "@styles";
import {LoremIpsum} from "../../util/LoremIpsum";
import {ClientOnlyFadeIn} from "../../util/ClientOnlyFadeIn";
import {useViewportHeight} from "../../util/hooks/useViewportHeight";
import {BGLandingProps} from "./types";
import {useAnimatedFields} from "@components/bg/BGLanding/useAnimatedFields";
import {useVideoLooper} from "@components/bg/BGLanding/useVideoLooper";
import {useThumbnailScrolling} from "@components/bg/BGLanding/useThumbnailScrolling";
import {IconYoutube} from "@components/icons/IconYoutube";
import {IconGithub} from "@components/icons/IconGithub";
import {IconBGDocs} from "@components/icons/IconBGDocs";
import {IconEyeOff} from "@components/icons/IconEyeOff";
import {IconEyeOn} from "@components/icons/IconEyeOn";

export const BGLanding = ({
                              children,
                              title,
                              mp4Path,
                              youtube,
                              bgdocs,
                              github
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
                                <a href={youtube}><IconYoutube name="youtube" unit={unit}/></a>
                                <a href={github}><IconGithub name="github" unit={unit}/></a>
                                <a href={bgdocs}><IconBGDocs name="bgdocs" unit={unit}/></a>
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
            <motion.div style={{y: showThumbnail ? viewportHeight : 0}}>
                <FullPageMinimum>
                    {children}
                    <LoremIpsum/>
                </FullPageMinimum>
            </motion.div>
        </ClientOnlyFadeIn>
    );
};