"use client";
import * as React from "react";
import {motion} from "framer-motion";
import {BGLandingProps} from "./types";
import {useAnimatedFields} from "./useAnimatedFields";
import {useVideoLooper} from "./useVideoLooper";
import {useBGLandingScroll} from "./useBGLandingScroll";
import {useViewportHeight, ClientOnlyFadeIn} from "../../util";
import {IconYoutube, IconGithub, IconBGDocs, IconEyeOff, IconEyeOn} from "../../icons";

export const BGLanding = ({
                              children,
                              title,
                              mp4Path,
                              youtube,
                              bgdocs,
                              github,
                              navigationComponent: NavigationComponent,
                              navigationItems = [],
                              onNavigationItemClick,
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
    const {showThumbnail} = useBGLandingScroll({viewportHeight});
    const {videoRef, isLooping, handleToggle} = useVideoLooper();

    return (
        <ClientOnlyFadeIn>
            {showThumbnail && (
                <>
                    {/* Landing Video */}
                    <motion.video
                        ref={videoRef}
                        className="fixed top-0 w-screen h-screen object-cover object-center -z-10"
                        style={{
                            y: thumbnailY,
                            opacity: thumbnailOpacity
                        }}
                        src={mp4Path}
                        preload="auto"
                        muted
                        playsInline
                    />

                    {!isLooping && (
                        <>
                            {/* Landing Title */}
                            <motion.div
                                className="fixed w-[70vw] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold text-6xl -z-10"
                                style={{
                                    top: titleTop,
                                    opacity: titleOpacity,
                                    textShadow: titleShadow
                                }}
                            >
                                {title}
                            </motion.div>

                            {/* Button Container */}
                            <motion.div
                                className="fixed top-[60%] left-0 w-full px-5 flex justify-around -z-10"
                                style={{
                                    opacity: buttonsOpacity
                                }}
                            >
                                <a href={youtube} className="text-white hover:text-gray-300 transition-colors">
                                    <IconYoutube unit={unit}/>
                                </a>
                                <a href={github} className="text-white hover:text-gray-300 transition-colors">
                                    <IconGithub unit={unit}/>
                                </a>
                                <a href={bgdocs} className="text-white hover:text-gray-300 transition-colors">
                                    <IconBGDocs unit={unit}/>
                                </a>
                            </motion.div>
                        </>
                    )}

                    {/* Play Video Button */}
                    <motion.button
                        className="fixed right-[2vw] bottom-[2vh] text-white hover:text-gray-300 transition-colors -z-10"
                        onClick={handleToggle}
                        style={{
                            opacity: buttonsOpacity
                        }}
                    >
                        {isLooping ? <IconEyeOff unit={unit}/> : <IconEyeOn unit={unit}/>}
                    </motion.button>
                </>
            )}

            {/* Full Page Content */}
            <div
                className="bg-white dark:bg-gray-900 min-h-screen w-full z-10"
                style={{
                    marginTop: showThumbnail ? `${viewportHeight}px` : '0'
                }}
            >
                <>
                    {NavigationComponent && (
                        <NavigationComponent
                            brand={title}
                            items={navigationItems}
                            onItemClick={onNavigationItemClick}
                        />
                    )}
                    {children}
                </>
            </div>
        </ClientOnlyFadeIn>
    );
};