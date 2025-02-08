import styled from "styled-components";

export const AbsolutePositionContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ColorWheelImg = styled.img<{ size: number}>`
  position: absolute;
  top: 50%;
  left: 50%;
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

export const DialInternal = styled.div.attrs<{ size: number; $r: number; $g: number; $b: number }>(
    (props) => ({
        style: {
            height: `${props.size * 4 / 5}px`,
            width: `${props.size * 4 / 5}px`,
            borderRadius: `${props.size * 4 / 5}px`,
            background: `rgb(${props.$r}, ${props.$g}, ${props.$b})`,
        },
    })
)`
  z-index: 10;
  &:hover {
    cursor: grab;
  }
`;

export const HEXInformation = styled.div`
  position: absolute;
  display: flex;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16vh;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  padding: 0;
  margin: 0;
  
  &:hover {
    cursor: pointer;
  }
  @media (orientation: portrait) {
    font-size: 16vw;
  }
`;

export const RGBInformation = styled.div`
  position: absolute;
  display: flex;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10vh;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;

  &:hover {
    cursor: pointer;
  }
  @media (orientation: portrait) {
    font-size: 10vw;
  }
`;

export const ColorCopied = styled.div<{ size: number; $r: number; $g: number; $b: number }>`
  height: ${({size}) => size*2}px;
  width: ${({size}) => size*2}px;
  display: flex;
  top: 50%;
  left: 50%;
  position: absolute;
  font-size: 300%;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  transform: translate(-50%, -50%);
  border-radius: ${({size}) => size*2}px;
  background-color: rgb(${({$r}) => $r}, ${({$g}) => $g}, ${({$b}) => $b});
  z-index: 11;
`;
