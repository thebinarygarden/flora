import React, {useEffect, useState} from "react";
import {
    useScroll
} from "framer-motion";
import {FullPageImageLanding} from "./FullPageLanding";

import {useLandingScrollLockEffect} from "../../hooks/scrollingHooks";
import {BGAnimatedContent} from "./BGAnimatedContent";
import {LoremIpsum} from "../../util/LoremIpsum";
import {useViewportHeight} from "../../hooks/viewportHooks";
import {BGLoadingChevron} from "./BGLoadingChevron";
import {BGLandingProps} from "../../types";

export const BGLanding = ({children, title, imagePath, imageAlt, buttons}: BGLandingProps) => {
    const viewportHeight = useViewportHeight();
    const {scrollY} = useScroll();
    const landingScollProps = {
        viewportHeight: viewportHeight,
        scrollY: scrollY,
        isScrollLocked: useLandingScrollLockEffect(viewportHeight / 4, viewportHeight, scrollY)
    }

    return (
        <>
            <FullPageImageLanding title={title} imagePath={imagePath} imageAlt={imageAlt} buttons={buttons}
                                  landingScrollProps={landingScollProps}/>
            <BGLoadingChevron landingScrollProps={landingScollProps}/>
            <BGAnimatedContent scrollY={scrollY} viewportHeight={viewportHeight}>
                {children}
                <LoremIpsum/>
            </BGAnimatedContent>
        </>
    );
};