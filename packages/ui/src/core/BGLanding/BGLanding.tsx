"use client";
import * as React from "react";
import {BGLandingProps} from "./types";
import {useVideoLooper} from "./useVideoLooper";
import {useViewportHeight} from "../../util";
import {IconYoutube, IconGithub, IconBGDocs, IconView, IconHide} from "../../icons";

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
                <div 
                    className="absolute inset-y-0 left-0 w-4/5 md:w-4/5 lg:w-3/4 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(to right, var(--background) 0%, var(--background) 10%, transparent 100%)',
                        opacity: isLooping ? 0 : 1
                    }}
                >
                        {/* Title */}
                        <h1
                            className="text-6xl font-bold mb-6"
                            style={{
                                color: 'var(--on-background)',
                                textShadow: `2px 2px 10px var(--background)`
                            }}
                        >
                            {title}
                        </h1>

                        {/* Description */}
                        <p
                            className="text-xl mb-8 max-w-md"
                            style={{
                                color: 'var(--on-background)',
                                opacity: 0.9
                            }}
                        >
                            {description}
                        </p>

                        {/* Action Icons */}
                        <div className="flex gap-4">
                            <a href={youtube} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconYoutube unit={unit} size={8}/>
                            </a>
                            <a href={github} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconGithub unit={unit} size={8}/>
                            </a>
                            <a href={bgdocs} className={bgLandingIconClass} style={bgLandingIconStyle}>
                                <IconBGDocs unit={unit} size={8}/>
                            </a>
                        </div>
                    </div>

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
                    fontFamily: 'var(--font-family)',
                    scrollSnapAlign: 'start'
                }}
            >
                {children}
            </div>
        </>
    );
};