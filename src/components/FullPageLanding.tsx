import React, {useEffect, useRef, useState} from "react";
import styled, {css, keyframes} from "styled-components";
import {ToggleFadeOut} from "../animations/ToggleFadeOut";

const Landing = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
`;

//
// color: ${(props) => props.theme.primary};
//

const Title = styled.div`
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
`;

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

type FullPageLandingProps = {
    imagePath: string,
    imageAlt?: string,
    title?: string
}

const FullPageLanding = ({imagePath, imageAlt, title}: FullPageLandingProps) => {
    const [fadeOut, setFadeOut] = useState(false);
    return (
        <>
            <ToggleFadeOut fadeOut={fadeOut}>
                <><Landing src={imagePath} alt={imageAlt ?? ""}/>
                <Title>{title}</Title></>
            </ToggleFadeOut>
            <Button onClick={() => setFadeOut(!fadeOut)}>{'Animation'}</Button>
        </>
    );
};

export {FullPageLanding};