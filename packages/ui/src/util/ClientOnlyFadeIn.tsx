"use client";
import * as React from "react";
import { useEffect, useState } from "react";

interface ClientOnlyFadeInProps {
    children: React.ReactNode;
    className?: string;
}

export const ClientOnlyFadeIn: React.FC<ClientOnlyFadeInProps> = ({ children }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div />;
    }

    return (
        <div 
            className={`animate-fade-in`}
            style={{
                animationDuration: '0.75s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
};