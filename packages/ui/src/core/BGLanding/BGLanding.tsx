"use client";
import * as React from "react";
import {motion} from "framer-motion";
import {BGLandingProps} from "./types";
import {useAnimatedFields} from "./useAnimatedFields";
import {useVideoLooper} from "./useVideoLooper";
import {useBGLandingScroll} from "./useBGLandingScroll";
import {useViewportHeight, ClientOnlyFadeIn} from "../../util";
import {IconYoutube, IconGithub, IconBGDocs, IconView, IconHide} from "../../icons";
import {useTheme} from "../../theme";

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
    const {theme} = useTheme();
    const {unit, viewportHeight} = useViewportHeight();

    // BGLanding icon styling utility
    const bgLandingIconClass = `hover-themed transition-colors p-2 rounded-md text-[${theme.onBackground}]`;
    const bgLandingIconStyle = {'--hover-color': theme.hover} as React.CSSProperties & { '--hover-color': string };
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
                                className="fixed w-[70vw] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-6xl -z-10"
                                style={{
                                    top: titleTop,
                                    opacity: titleOpacity,
                                    textShadow: titleShadow,
                                    color: theme.onBackground,
                                    fontFamily: theme.fontFamily
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
                                <a href={youtube} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                    <IconYoutube unit={unit}/>
                                </a>
                                <a href={github} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                    <IconGithub unit={unit}/>
                                </a>
                                <a href={bgdocs} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                    <IconBGDocs unit={unit}/>
                                </a>
                            </motion.div>
                        </>
                    )}

                    {/* Play Video Button */}
                    <motion.div
                        className={`fixed right-[2vw] bottom-[2vh] -z-10`}
                        style={{
                            opacity: buttonsOpacity
                        }}
                    >
                        <a onClick={handleToggle} className={`${bgLandingIconClass} cursor-pointer`} style={bgLandingIconStyle}>
                            {isLooping ? <IconHide unit={unit}/> : <IconView unit={unit}/>}
                        </a>
                    </motion.div>
                </>
            )}
            {/* Full Page Content */}
            <div
                className="min-h-screen w-full z-10"
                style={{
                    backgroundColor: theme.background,
                    color: theme.onBackground,
                    fontFamily: theme.fontFamily,
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