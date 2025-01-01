import styled from "styled-components";
import {motion} from "motion/react";

export const LandingTitle = motion.create(styled.div`
  font-family: ${(props) => props.theme.fontHeader};
  text-shadow: 5px 5px 10px ${(props) => props.theme.primary};
  width: 70vw;
  margin: auto;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (prefers-color-scheme: dark) {
    text-shadow: 5px 5px 10px ${(props) => props.theme.primaryNight};
  }

  @media (orientation: portrait) {
    font-size: 10vw;
    line-height: 8vw;
  }

  @media (orientation: landscape) {
    font-size: 10vh;
    line-height: 8vh;
  }
`);

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  z-index: 10;
`;

export const FullPageMinimum = styled.div`
  position: absolute;
  background: ${(props) => props.theme.background};
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;

  @media (prefers-color-scheme: dark) {
    background: ${(props) => props.theme.backgroundNight};
  }
`;

