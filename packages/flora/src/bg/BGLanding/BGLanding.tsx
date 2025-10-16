'use client';
import * as React from 'react';
import { BGLandingProps } from './types';
import { useVideoLooper } from './useVideoLooper';
import { useAnimatedFields } from './useAnimatedFields';
import {
  IconYoutube,
  IconGithub,
  IconBGDocs,
  IconView,
  IconHide,
} from '../../icons';
import { motion } from 'framer-motion';
import { useViewport } from '../../hooks/useViewport';
import { useBGLandingScroll } from './useBGLandingScroll';

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
  onBrandClick,
}: BGLandingProps) => {
  const { height, isPortrait } = useViewport();
  const unit = isPortrait ? 'vw' : 'vh';
  const { videoRef, isLooping, handleToggle } = useVideoLooper();
  const { heroContentOpacity, navOpacity, leftOverlay, bottomOverlay } =
    useAnimatedFields({ viewportHeight: height });

  // Auto-scroll behavior to prevent getting stuck between sections
  useBGLandingScroll({ viewportHeight: height });

  // BGLanding icon styling utility - use CSS variables to avoid flash
  const bgLandingIconClass = `icon-hover transition-colors p-2 rounded-md`;

  return (
    <>
      {/* Navigation */}
      {NavigationComponent && (
        <NavigationComponent
          brand={title}
          items={navigationItems}
          onBrandClick={onBrandClick!}
          navOpacity={navOpacity}
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

        {/* Left Content Overlay */}
        <motion.div
          className="absolute inset-y-0 w-full left-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 transition-opacity duration-500"
          style={{
            background: leftOverlay,
            opacity: isLooping ? 0 : 1,
          }}
        >
          {/* Title */}
          <motion.h1
            className="text-6xl font-bold mb-6"
            style={{
              color: 'var(--on-background)',
              textShadow: `2px 2px 10px var(--background)`,
              opacity: heroContentOpacity,
            }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl mb-8 max-w-md"
            style={{
              color: 'var(--on-background)',
              opacity: heroContentOpacity,
            }}
          >
            {description}
          </motion.p>

          {/* Action Icons */}
          <motion.div
            className="flex gap-4"
            style={{ opacity: heroContentOpacity }}
          >
            <a href={youtube} className={bgLandingIconClass}>
              <IconYoutube unit={unit} size={8} />
            </a>
            <a href={github} className={bgLandingIconClass}>
              <IconGithub unit={unit} size={8} />
            </a>
            <a href={bgdocs} className={bgLandingIconClass}>
              <IconBGDocs unit={unit} size={8} />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Blur Overlay */}
        <motion.div
          className="absolute h-full bottom-0 left-0 w-full z-5 pointer-events-none"
          style={{
            background: bottomOverlay,
          }}
        />

        {/* Video Toggle Button */}
        <motion.div
          className="absolute bottom-4 right-4 z-10"
          style={{ opacity: heroContentOpacity }}
        >
          <button
            onClick={handleToggle}
            className={`${bgLandingIconClass} cursor-pointer`}
          >
            {isLooping ? <IconHide unit={unit} /> : <IconView unit={unit} />}
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div
        className="relative h-screen w-full"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--on-background)',
        }}
      >
        {/* Nav Spacer */}
        {navOpacity && <div className="w-full h-16" />}
        {children}
      </div>
    </>
  );
};
