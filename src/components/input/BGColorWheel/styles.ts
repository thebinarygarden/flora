import styled from "styled-components";

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
)``;