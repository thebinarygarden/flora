import {MotionValue, motion, useTransform} from "framer-motion";
import React from "react";
import styled from "styled-components";

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

type BGAnimatedContentProps = {
    children: React.ReactNode,
    scrollY: MotionValue<number>,
    viewportHeight: number
}

export const BGAnimatedContent = ({children, scrollY, viewportHeight}: BGAnimatedContentProps) => {
    const contentYTransform = useTransform(scrollY, [0, viewportHeight], [viewportHeight, viewportHeight])
    return  (
        <motion.div style={{y: contentYTransform}}>
            <FullPageMinimum>
                {children}
            </FullPageMinimum>
        </motion.div>
    );
}