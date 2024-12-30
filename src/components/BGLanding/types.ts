import {FC} from "react";
import {BGLandingScrollProps} from "../../hooks/types";

export type FullPageLandingProps = {
    imagePath?: string,
    imageAlt?: string,
    title?: string,
    buttons?: FC[],
    landingScrollProps: BGLandingScrollProps,
}

export type BGAnimatedImageProps = {
    landingScrollProps: BGLandingScrollProps,
}