import React from "react";
import styled from "styled-components";

const LandingImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
`;

const LandingTitle = styled.div`
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

export type FullPageLandingProps = {
    imagePath: string,
    imageAlt?: string,
    title?: string
    buttons?: []
}

const FullPageLanding = ({imagePath, imageAlt, title}: FullPageLandingProps) => {
    return (
        <>
            <LandingImage src={imagePath} alt={imageAlt ?? ""}/>
            <LandingTitle>{title}</LandingTitle>
        </>
    );
};

export {FullPageLanding};