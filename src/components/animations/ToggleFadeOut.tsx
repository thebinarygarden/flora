import styled, {keyframes} from "styled-components";
import React, {useEffect, useRef, useState} from "react";

const fadeInAnimation = keyframes`
  from { opacity: var(--start-opacity); }
  to { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  from { opacity: var(--start-opacity); }
  to { opacity: 0; }
`;

const AnimatedFadingDiv = styled.div<{ fadeOut: boolean, startOpacity: number }>`
  --start-opacity: ${(props) => props.startOpacity}; // Using CSS variable to set dynamic start opacity
  animation: ${(props) => props.fadeOut ? fadeOutAnimation : fadeInAnimation} 0.5s linear forwards;
`;

export const ToggleFadeOut = ({children, fadeOut} : {children: React.JSX.Element, fadeOut: boolean}) => {
    const animatedFadingDivRef = useRef(null);

    const [currentOpacity, setCurrentOpacity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (animatedFadingDivRef.current) {
                const style = window.getComputedStyle(animatedFadingDivRef.current)
                const opacity = parseFloat(style.opacity);
                setCurrentOpacity(opacity);
            }
        }, 100);  // Checks every 100 milliseconds

        return () => clearInterval(interval);  // Clean up the interval on component unmount
    }, [fadeOut]);

    return (
        <AnimatedFadingDiv ref={animatedFadingDivRef} fadeOut={fadeOut} startOpacity={currentOpacity}>
            {children}
        </AnimatedFadingDiv>
    );
}