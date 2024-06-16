import {ToggleFadeOut} from "../animations/ToggleFadeOut";
import React, {useState} from "react";
import {motion, useScroll} from "framer-motion";
import styled from "styled-components";
import {FullPageLanding, FullPageLandingProps} from "../components/Landing/FullPageLanding";
import {LoremIpsum} from "../components/util/LoremIpsum";

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.primary};
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.backgroundNight};
  }
`;

type BGLandingNavProps = {
    fullPageLandingProps: FullPageLandingProps
}

export const BGLandingNav = (props: BGLandingNavProps) => {
    const [fadeOut, setFadeOut] = useState(false);
    const {scrollYProgress} = useScroll();

    // Scale factor to speed up the animation
    const scaleFactor = 2;

    // Modify scrollYProgress to change the animation speed
    const fastScroll = scrollYProgress.get() * scaleFactor;

    // Ensure the value stays within 0 to 1
    const adjustedScroll = Math.min(fastScroll, 1);
// Debugging output to see the scroll progress
    console.log("Scroll Y Progress:", scrollYProgress);
    console.log("Adjusted Scroll:", adjustedScroll);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Click Me
            </motion.button>
            <FullPageLanding  {...props.fullPageLandingProps} />
            <LoremIpsum />
        </>
    );
};