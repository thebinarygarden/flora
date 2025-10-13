"use client";
import {useEffect, useRef} from 'react';

interface UseBGLandingScrollProps {
    viewportHeight: number;
}

export const useBGLandingScroll = ({viewportHeight}: UseBGLandingScrollProps) => {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current!);
            }

            // Only act if scroll is between 0 and viewportHeight
            const currentScrollY = window.scrollY;
            if (currentScrollY > 0 && currentScrollY < viewportHeight) {
                timeoutRef.current = setTimeout(() => {
                    const targetScroll = currentScrollY < viewportHeight / 2 ? 0 : viewportHeight;

                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current!);
            }
        };
    }, [viewportHeight]);
};