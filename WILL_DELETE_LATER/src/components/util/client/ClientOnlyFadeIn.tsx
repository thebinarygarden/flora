"use client";
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadingDiv = styled.div`
  animation: ${fadeIn} 0.2s ease-out forwards;
  height: 100%;
  width: 100%;
`;

export const ClientOnlyFadeIn: FC<PropsWithChildren>  = ({ children }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div />;
    }

    return (
        <FadingDiv>
            {children}
        </FadingDiv>
    );
};
