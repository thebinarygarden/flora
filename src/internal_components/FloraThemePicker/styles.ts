import styled from "styled-components";

export const SeedContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aqua;
`;

export const ColorWheelSection = styled.div`
  height: 30vh;
  min-height: 200px;
  width: 90vw;
  display: flex;
  padding-block: 1vw;
  padding-inline: 5vw;
  background-color: blue;
`;

export const ColorWheelContainer = styled.div`
  width: 30%;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

export const PrimaryPaletteSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: auto;
  justify-content: center;
`;

export const ColorPaletteContainer = styled.div<{$vertical:string|null}>`
  display: flex;
  height: 30%;
  width: ${({$vertical}) => Boolean($vertical) ? "10vw" : "100%"};
  flex-direction: ${({$vertical}) => Boolean($vertical) ? "column" : "row"};
  justify-content: space-around;
`;

export const ColorSwatch = styled.div<{$vertical:string|null, color: string}>`
  flex: 1;
  background-color: ${({color}) => color};
`;

