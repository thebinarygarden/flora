"use client";
import * as React from "react";
import {BGLandingProps} from "./types";
import {useVideoLooper} from "./useVideoLooper";
import {useViewportHeight} from "../../util";
import {IconYoutube, IconGithub, IconBGDocs, IconView, IconHide} from "../../icons";

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
    const {unit} = useViewportHeight();
    const {videoRef, isLooping, handleToggle} = useVideoLooper();

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
                    onItemClick={onNavigationItemClick}
                />
            )}

            {/* Hero Section */}
            <div className="relative h-screen w-full">
                {/* Background Video */}
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    src={mp4Path}
                    preload="auto"
                    muted
                    playsInline
                />

                {/* Hero Content */}
                {!isLooping && (
                    <>
                        {/* Title */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <h1
                                className="text-6xl font-bold text-center max-w-[70vw]"
                                style={{
                                    textShadow: `4px 4px 30px var(--on-background)`
                                }}
                            >
                                {title}
                            </h1>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute bottom-[40%] left-0 right-0 flex justify-around px-5 z-10">
                            <a href={youtube} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconYoutube unit={unit}/>
                            </a>
                            <a href={github} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconGithub unit={unit}/>
                            </a>
                            <a href={bgdocs} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconBGDocs unit={unit}/>
                            </a>
                        </div>
                    </>
                )}

                {/* Video Toggle Button */}
                <div className="absolute bottom-4 right-4 z-10">
                    <button onClick={handleToggle} className={`${bgLandingIconClass} cursor-pointer`} style={bgLandingIconStyle}>
                        {isLooping ? <IconHide unit={unit}/> : <IconView unit={unit}/>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="relative w-full"
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--on-background)',
                    fontFamily: 'var(--font-family)'
                }}
            >
                {children}
            </div>
        </>
    );
};