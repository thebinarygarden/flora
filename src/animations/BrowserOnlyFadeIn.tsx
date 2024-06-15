import React, {useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import {FloraTheme} from "../components/FloraThemeProvider";

// Define the keyframes for the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Create a styled div that uses the animation
const FadingDiv = styled.div<FloraTheme>`
  animation: ${fadeIn} 0.2s ease-out forwards;
`;

// TypeScript interface for props
type BrowserOnlyFadeInProps = {
    children: React.JSX.Element;
}

// Component definition
export const BrowserOnlyFadeIn = ({ children } : BrowserOnlyFadeInProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div />; // Return an empty div if not in the browser
    }

    // If in the browser, use the styled FadingDiv
    return (
        <FadingDiv>
            {children}
        </FadingDiv>
    );
};

