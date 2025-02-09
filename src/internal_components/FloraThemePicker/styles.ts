import styled from "styled-components";

export const ColorWheelSection = styled.div`
  height: 30vh;
  width: 90vw;
  display: flex;
  padding: 5vw;
`;

export const ColorWheelContainer = styled.div`
  width: 30%;
  height: auto;
`;

export const PrimaryPaletteSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
`;

export const ColorPaletteContainer = styled.div<{$vertical:string|null}>`
  display: flex;
  height: ${({$vertical}) => Boolean($vertical) ? "100%" : "10vh"};
  width: ${({$vertical}) => Boolean($vertical) ? "10vw" : "100%"};
  flex-direction: ${({$vertical}) => Boolean($vertical) ? "column" : "row"};
  justify-content: space-around;
  
  background-color: papayawhip;
`;

export const ColorSwatch = styled.div<{$vertical:string|null, color: string}>`
  flex: 1;
  background-color: ${({color}) => color};
`;

