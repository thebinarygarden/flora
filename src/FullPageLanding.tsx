import React from "react";
import styled from "styled-components";

const Landing = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
`;

const Title = styled.div<{fontFamily?: string}>`
  color: ${(props) => props.theme.primary ?? "#FFFFFF"};
  font-weight: bolder;
  width: 70vw;
  margin: auto;
  position: absolute;
  text-align: center;
  top: 50%;
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
`;

type FullPageLandingProps = {
    imagePath: string,
    imageAlt?: string,
    title? : string,
    titleColor?: string,
    fontFamily?: string
}

const FullPageLanding = ({imagePath, imageAlt, title, titleColor, fontFamily}: FullPageLandingProps) => (
    <>
        <Landing src={imagePath} alt={imageAlt ?? ""}/>
        <Title fontFamily={fontFamily}>{title}</Title>
    </>
);

export default FullPageLanding;