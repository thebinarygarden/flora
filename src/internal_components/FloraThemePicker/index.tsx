"use client"
import {RGB} from "./BGColorWheel/types";
import {useState} from "react";
import {BGColorWheel} from "./BGColorWheel";
import {ClientOnlyFadeIn} from "@components/util/client/ClientOnlyFadeIn";
import {ColorWheelSection} from "./styles";

export function BGThemePicker() {
    const [currentColor, setCurrentColor] = useState<RGB>({r: 0, g: 0, b: 0});
    return (
        <ColorWheelSection>
            <ClientOnlyFadeIn>
                <BGColorWheel currentColor={currentColor} setCurrentColor={setCurrentColor}/>
            </ClientOnlyFadeIn>
        </ColorWheelSection>
    );
}
