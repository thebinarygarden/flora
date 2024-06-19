import React, {useEffect, useState} from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import styled from "styled-components";
import {FullPageImageLanding, FullPageLandingProps} from "../components/Landing/FullPageLanding";

import {IconButtonProps} from "../components/buttons/IconButton";
import {FullPageImage} from "../components/Landing/FullPageImage";

const FullPageMinimum = styled.div`
  position: absolute;
  background: ${(props) => props.theme.background};
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;

  @media (prefers-color-scheme: dark) {
    background: ${(props) => props.theme.backgroundNight};
  }
`;

type BGLandingNavProps = {
    children: React.JSX.Element,
    imagePath: string,
    title: string,
    buttonInfo: IconButtonProps[]
}

export const BGLandingNav = (props: BGLandingNavProps) => {
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const {scrollY} = useScroll();
    const y = useTransform(scrollY, [0, viewportHeight], [viewportHeight, viewportHeight])
    const animatedContent = (
        <motion.div style={{y}}>
            <FullPageMinimum>
                {props.children}
            </FullPageMinimum>
        </motion.div>
    );
    scrollY.onChange(y => console.log("scroll "  + y))
    useEffect(() => {
        console.log(viewportHeight);
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerHeight]);

    return (
        <>
            <FullPageImageLanding imageElement={<FullPageImage src={props.imagePath} alt={""}/>}/>
            {animatedContent}
        </>
    );
};