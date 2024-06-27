import React, {useEffect, useState} from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useAnimation,
    useAnimate,
    useMotionValueEvent,
    MotionValue
} from "framer-motion";
import styled from "styled-components";
import {FullPageImageLanding, FullPageLandingProps} from "../../components/landing/FullPageLanding";

import {IconButtonProps} from "../../components/buttons/IconButton";
import {useLandingScrollLockEffect } from "../../hooks/scrollingHooks";
import {BGAnimatedContent} from "./BGAnimatedContent";
import {BGAnimatedImage} from "./BGAnimatedImage";
import {LoremIpsum} from "../../components/other/LoremIpsum";
import {useViewportHeight} from "../../hooks/viewportHooks";

type BGLandingNavProps = {
    children: React.JSX.Element,
    imagePath: string,
    title: string,
    buttonInfo: IconButtonProps[]
    scrollLocked?: boolean
}

export type BGLandingScrollProps = {
    viewportHeight: number,
    scrollY: MotionValue<number>
    isScrollLocked: boolean
}

export const BGLandingNav = ({children, imagePath, title, buttonInfo, scrollLocked}: BGLandingNavProps) => {
    const viewportHeight = useViewportHeight();
    const {scrollY} = useScroll();
    const landingScollProps = {
        viewportHeight :viewportHeight,
         scrollY: scrollY,
        isScrollLocked: useLandingScrollLockEffect(viewportHeight / 4, viewportHeight, scrollY)
    }

    return (
        <>
            <FullPageImageLanding
                imageElement={<BGAnimatedImage imagePath={imagePath} landingScrollProps={landingScollProps}/>}/>
            <BGAnimatedContent scrollY={scrollY} viewportHeight={viewportHeight}>
                {children}
                <LoremIpsum></LoremIpsum>
            </BGAnimatedContent>
        </>
    );
};