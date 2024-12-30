import {MotionValue} from "framer-motion";

export type BGLandingScrollProps = {
    viewportHeight: number,
    scrollY: MotionValue<number>
    isScrollLocked: boolean
}