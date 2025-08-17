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
    const overlayWidth = useTransform(scrollY, [phase[0], phase[2]], ['10', '100']);
    // Create animated gradient template
    const overlapGradientWidth = useMotionTemplate`linear-gradient(to right, var(--background) 0%, var(--background) ${overlayWidth}%, transparent 100%)`;

    // Nav animations happen at 80% of viewport height
    const navOpacity = useTransform(scrollY, [phase[3], phase[4]], [0, 1]);

    return {
        heroContentOpacity,
        navOpacity,
        overlapGradientWidth
    };
}