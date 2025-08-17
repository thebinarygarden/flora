"use client";
import * as React from "react";
import {BGLandingProps} from "./types";
import {useVideoLooper} from "./useVideoLooper";
import {useAnimatedFields} from "./useAnimatedFields";
import {useViewportHeight} from "../../util";
import {IconYoutube, IconGithub, IconBGDocs, IconView, IconHide} from "../../icons";
import {motion} from "framer-motion";

export const BGLanding = ({
                              children,
                              title,
                              description,
                              mp4Path,
                              youtube,
                              bgdocs,
                              github,
                              navigationComponent: NavigationComponent,
                              navigationItems = [],
                              onNavigationItemClick,
                          }: BGLandingProps) => {
    const {unit, viewportHeight} = useViewportHeight();
    const {videoRef, isLooping, handleToggle} = useVideoLooper();
    const {heroContentOpacity, navOpacity, overlapGradientWidth} = useAnimatedFields({viewportHeight});

    // BGLanding icon styling utility - use CSS variables to avoid flash
    const bgLandingIconClass = `hover-themed transition-colors p-2 rounded-md`;
    const bgLandingIconStyle = {
        '--hover-color': 'var(--background)',
        color: 'var(--on-background)'
    } as React.CSSProperties & { '--hover-color': string };

    return (
        <>
            {/* Navigation */}
            {NavigationComponent && (
                <NavigationComponent
                    brand={title}
                    items={navigationItems}
                    onItemClick={onNavigationItemClick!}
                    navOpacity={navOpacity}
                />
            )}

            {/* Hero Section */}
            <div className="relative h-screen w-full" style={{ scrollSnapAlign: 'start' }}>
                {/* Background Video */}
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    src={mp4Path}
                    preload="auto"
                    muted
                    playsInline
                />

                {/* Left Content Overlay */}
                <motion.div 
                    className="absolute inset-y-0 w-full left-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 transition-opacity duration-500"
                    style={{
                        background: overlapGradientWidth,
                        opacity: isLooping ? 0 : 1
                    }}
                >
                        {/* Title */}
                        <motion.h1
                            className="text-6xl font-bold mb-6"
                            style={{
                                color: 'var(--on-background)',
                                textShadow: `2px 2px 10px var(--background)`,
                                opacity: heroContentOpacity
                            }}
                        >
                            {title}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-xl mb-8 max-w-md"
                            style={{
                                color: 'var(--on-background)',
                                opacity: heroContentOpacity
                            }}
                        >
                            {description}
                        </motion.p>

                        {/* Action Icons */}
                        <motion.div 
                            className="flex gap-4"
                            style={{ opacity: heroContentOpacity }}
                        >
                            <a href={youtube} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconYoutube unit={unit} size={8}/>
                            </a>
                            <a href={github} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconGithub unit={unit} size={8}/>
                            </a>
                            <a href={bgdocs} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconBGDocs unit={unit} size={8}/>
                            </a>
                        </motion.div>
                    </motion.div>

                {/* Video Toggle Button */}
                <motion.div 
                    className="absolute bottom-4 right-4 z-10"
                    style={{ opacity: heroContentOpacity }}
                >
                    <button onClick={handleToggle} className={`${bgLandingIconClass} cursor-pointer`} style={bgLandingIconStyle}>
                        {isLooping ? <IconHide unit={unit}/> : <IconView unit={unit}/>}
                    </button>
                </motion.div>
            </div>

            {/* Main Content */}
            <div
                className="relative w-full"
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--on-background)',
                    fontFamily: 'var(--font-family)',
                    scrollSnapAlign: 'start'
                }}
            >
                {/* Nav Spacer - Only when nav background is visible */}
                <motion.div 
                    className="w-full"
                    style={{ 
                        height: navOpacity ? '4rem' : '0rem',
                        transition: 'height 0.3s ease-in-out'
                    }}
                />
                {children}
            </div>
        </>
    );
};