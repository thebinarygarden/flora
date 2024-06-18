import {ToggleFadeOut} from "../animations/ToggleFadeOut";
import React, {useState} from "react";
import {motion, useScroll, useSpring} from "framer-motion";
import styled from "styled-components";
import {FullPageImageLanding, FullPageLandingProps} from "../components/Landing/FullPageImageLanding";
import {LoremIpsum} from "../util/LoremIpsum";
import {IconButtonProps} from "../components/buttons/IconButton";

const FullPageMinimum = styled.div`
  min-height: 100vh;
`;

type BGLandingNavProps = {
    children: React.JSX.Element,
    imagePath: string,
    title: string,
    buttonInfo: IconButtonProps[]
}

export const BGLandingNav = (props: BGLandingNavProps) => {
    const [fadeOut, setFadeOut] = useState(false);
//     const {scrollYProgress} = useScroll();
//
//     // Scale factor to speed up the animation
//     const scaleFactor = 2;
//
//     // Modify scrollYProgress to change the animation speed
//     const fastScroll = scrollYProgress.get() * scaleFactor;
//
//     // Ensure the value stays within 0 to 1
//     const adjustedScroll = Math.min(fastScroll, 1);
// // Debugging output to see the scroll progress
//     console.log("Scroll Y Progress:", scrollYProgress);
//     console.log("Adjusted Scroll:", adjustedScroll);

    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });


    return (
        <>
            <FullPageImageLanding imagePath={props.imagePath}/>
            <FullPageMinimum>
                {props.children}
            </FullPageMinimum>
        </>
    );
};