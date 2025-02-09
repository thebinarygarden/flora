import styled from "styled-components";

export const AbsolutePositionContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ColorWheelImg = styled.img<{ size: number, x: number, y: number}>`
  position: absolute;
  top: ${({y}) => y}px;
  left: ${({x}) => x}px;
  height: ${({size}) => size*2.1}px;
  width: ${({size}) => size*2.1}px;
  transform: translate(-50%, -50%);
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
`;

export const DialOutline = styled.div.attrs<{ size: number, x: number, y: number }>(
    (props) => ({
        style: {
            height: `${props.size}px`,
            width: `${props.size}px`,
            borderRadius: `${props.size}px`,
            transform: `translate(${props.x - (props.size/2)}px, ${props.y - (props.size/2)}px)`
        },
    })
)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFF;
  z-index: 10;
  &:hover {
  cursor: grab;
}
`;

export const DialInternal = styled.div.attrs<{ size: number; color: string }>(
    (props) => ({
        style: {
            height: `${props.size * 4 / 5}px`,
            width: `${props.size * 4 / 5}px`,
            borderRadius: `${props.size * 4 / 5}px`,
            background: `${props.color}`,
        },
    })
)`
  z-index: 10;
  &:hover {
    cursor: grab;
  }
`;

export const HEXInformation = styled.div<{ size: number, x: number, y: number}>`
  position: absolute;
  display: flex;
  top: ${({y}) => y*0.8}px;
  left: ${({x}) => x}px;
  transform: translate(-50%, -50%);
  font-size: ${({size}) => size/3}px;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  padding: 0;
  margin: 0;
  
  &:hover {
    cursor: pointer;
  }
`;

export const RGBInformation = styled.div<{ size: number, x: number, y: number}>`
  position: absolute;
  display: flex;
  top: ${({y}) => y*1.2}px;
  left: ${({x}) => x}px;
  transform: translate(-50%, -50%);
  font-size: ${({size}) => size/4}px;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

export const ColorCopied = styled.div<{ size: number; x: number, y: number, $r: number; $g: number; $b: number }>`
  height: ${({size}) => size*1.9}px;
  width: ${({size}) => size*1.9}px;
  display: flex;
  top: ${({y}) => y}px;
  left: ${({x}) => x}px;
  position: absolute;
  font-size: ${({size}) => size/3}px;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  transform: translate(-50%, -50%);
  border-radius: ${({size}) => size*2}px;
  background-color: rgb(${({$r}) => $r}, ${({$g}) => $g}, ${({$b}) => $b});
  z-index: 11;
`;

export const ColorWheelSection = styled.div`
  height: 30vh;
  width: 100vw;
  display: flex;
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
  background-color: aqua;
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

