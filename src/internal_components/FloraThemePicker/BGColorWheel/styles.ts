import styled from "styled-components";

export const AbsolutePositionContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ColorWheelImg = styled.img.attrs<{ size: number, x: number, y: number }>(
    (props) => ({
        style: {
            height: `${props.size*2.1}px`,
            width: `${props.size*2.1}px`,
            transform: `translate(${props.x - (props.size*1.05)}px, ${props.y - (props.size*1.05)}px)`
        },
    })
)`
  position: absolute;
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
  z-index: 5;
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
  z-index: 5;
  &:hover {
    cursor: grab;
  }
`;

export const HEXInformation = styled.div.attrs<{ size: number, x: number, y: number }>((props) => {
    const isPortrait = window.innerHeight > window.innerWidth;
    return {
        style: {
            fontSize: `${props.size / 3}px`,
            transform: `translate(${props.x - (props.size/1.6)}px, ${props.y - (props.size/2.4)}px)`
        },
    };
})`
  position: absolute;
  display: flex;
  justify-content: center;
  -webkit-user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

export const RGBInformation = styled.div.attrs<{ size: number, x: number, y: number }>(
    (props) => ({
        style: {
            fontSize: `${props.size/4}px`,
            transform: `translate(${props.x - (props.size/2)}px, ${props.y + (props.size/10)}px)`
        },
    })
)`
  position: absolute;
  justify-content: center;
  -webkit-user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

export const ColorCopied = styled.div.attrs<{ size: number, x: number, y: number, color: string }>(
    (props) => ({
        style: {
            height: `${props.size*1.9}px`,
            width: `${props.size*1.9}px`,
            borderRadius: `${props.size*2}px`,
            fontSize: `${props.size/4}px`,
            transform: `translate(${props.x- props.size}px, ${props.y - (props.size)}px)`,
            background: `${props.color}`,
        },
    })
)`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  z-index: 11;
`;