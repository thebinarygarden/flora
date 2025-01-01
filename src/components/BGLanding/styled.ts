import styled from "styled-components";
import {motion} from "motion/react";

export const LandingTitle = motion.create(styled.div`
  font-family: ${(props) => props.theme.fontHeader};
  width: 70vw;
  margin: auto;
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (orientation: portrait) {
    font-size: 10vw;
    line-height: 8vw;
  }

  @media (orientation: landscape) {
    font-size: 10vh;
    line-height: 8vh;
  }
`);

export const ButtonContainer = motion.create(styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 60%;
  left: 0;
  width: 100%;
  padding-inline: 20px;
  z-index: 10;
`);

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

