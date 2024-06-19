import React, {useEffect, useState} from "react";
import {motion, useScroll, useSpring, useTransform, useAnimation, useAnimate, useMotionValueEvent} from "framer-motion";
import styled from "styled-components";
import {FullPageImageLanding, FullPageLandingProps} from "../../components/landing/FullPageLanding";

import {IconButtonProps} from "../../components/buttons/IconButton";
import {useScrollLockEffect } from "../../hooks/scrollingHooks";
import {BGAnimatedContent} from "./BGAnimatedContent";
import {BGAnimatedImage} from "./BGAnimatedImage";
import {LoremIpsum} from "../../components/other/LoremIpsum";
import {useViewportHeight} from "../../hooks/viewportHooks";

type BGLandingNavProps = {
    children: React.JSX.Element,
    imagePath: string,
    title: string,
    buttonInfo: IconButtonProps[]
}

export const BGLandingNav = ({children, imagePath, title, buttonInfo}: BGLandingNavProps) => {
    const viewportHeight = useViewportHeight();
    const {scrollY} = useScroll();
    //useScrollLockEffect(viewportHeight / 4, viewportHeight, scrollY)

    return (
        <>
            <FullPageImageLanding
                imageElement={<BGAnimatedImage imagePath={imagePath}  scrollY={scrollY} viewportHeight={viewportHeight}/>}/>
            <BGAnimatedContent scrollY={scrollY} viewportHeight={viewportHeight}>
                {scrollY.get()} {children}
                <LoremIpsum></LoremIpsum>
            </BGAnimatedContent>
        </>
    );
};