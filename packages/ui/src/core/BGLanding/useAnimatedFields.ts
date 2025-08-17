import {useScroll, useTransform, useMotionTemplate} from "framer-motion";
import {useMemo} from "react";
import {AnimatedFieldsProps} from "./types";

export const useAnimatedFields = ({viewportHeight}: AnimatedFieldsProps) => {
    const {scrollY} = useScroll();

    // Re-implement phases with updated thresholds
    const phase = useMemo(() => 
        [0, .2, .5, .8, 1].map(n => n * viewportHeight),
        [viewportHeight]
    );

    // Consolidated single opacity for all hero content
    const heroContentOpacity = useTransform(scrollY, [phase[0], phase[2]], [1, 0]);
    
    // Overlay expands gradually through first half of viewport
    const leftOverlayWidth = useTransform(scrollY, [phase[0], phase[2]], ['10', '100']);
    // Create animated gradient template
    const leftOverlay = useMotionTemplate`linear-gradient(to right, var(--background) 0%, var(--background) ${leftOverlayWidth}%, transparent 100%)`;

    // Bottom blur effect height - goes from 0% to 20% during first 20% of scroll
    const bottomOverlayHeight = useTransform(scrollY, [phase[0], phase[4]], ['0', '40']);
    // Create animated blur gradient template
    const bottomOverlay = useMotionTemplate`linear-gradient(to top, var(--background) 0%, transparent ${bottomOverlayHeight}%)`;

    // Nav animations happen at 80% of viewport height
    const navOpacity = useTransform(scrollY, [phase[3], phase[4]], [0, 1]);

    return {
        heroContentOpacity,
        navOpacity,
        leftOverlay,
        bottomOverlay
    };
}