import styled from "styled-components";
import React from "react";

export type IconButtonProps = {
    iconPath: string,
    onClick: () => void
}

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;
export const IconButton = ({iconPath, onClick} : IconButtonProps) => {
    return (
        <Button>
            <img src={iconPath} onClick={onClick}/>
        </Button>
    );
};