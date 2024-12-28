import styled from "styled-components";

export const LandingTitle = styled.div`
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

export const LandingFullPageImage = styled.img<{top?: number}>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  z-index: -1;
  top: ${(props) => props.top || 0}px;
`;

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

