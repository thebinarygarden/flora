import styled from "styled-components";

export const AbsolutePositionContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const ColorDiv = styled.div.attrs<{ x: number; y: number; size: number; c: { r: number, g: number, b: number } }>(
    (props) => ({
        style: {
            borderRadius: `${props.size}px`,
            width: `${props.size}px`,
            height: `${props.size}px`,
            transform: `translate(${props.x - (props.size / 2)}px, ${props.y - (props.size / 2)}px)`,
            background: `rgb(${props.c.r}, ${props.c.g}, ${props.c.b})`,

        },
    })
)`
  position: absolute;
  user-select: none;
  -webkit-user-select: none;
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
`;

export const HEXInformation = styled.div`
  position: absolute;
  display: flex;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 400%;
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

export const RGBInformation = styled.div`
  position: absolute;
  display: flex;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 300%;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;

  &:hover {
    cursor: pointer;
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
