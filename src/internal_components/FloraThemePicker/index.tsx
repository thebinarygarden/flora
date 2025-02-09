"use client"
import {RGB} from "./types";
import {useState} from "react";
import {BGColorWheel} from "./BGColorWheel";
import {ClientOnlyFadeIn} from "@components/util/client/ClientOnlyFadeIn";
import {ColorWheelContainer, ColorWheelSection, PrimaryPaletteSection} from "./styles";
import {BrightnessColorPalette} from "./BGColorPalette/BrightnessColorPalette";
import {SaturationColorPalette} from "./BGColorPalette/SaturationColorPalette";

export function BGThemePicker() {
    const [currentColor, setCurrentColor] = useState<RGB>({r: 0, g: 0, b: 0});
    return (
        <ColorWheelSection>
            <ColorWheelContainer>
                <ClientOnlyFadeIn>
                    <BGColorWheel currentColor={currentColor} setCurrentColor={setCurrentColor}/>
                </ClientOnlyFadeIn>
            </ColorWheelContainer>
            <PrimaryPaletteSection>
                <BrightnessColorPalette color={currentColor}/>
                <SaturationColorPalette color={currentColor}/>
            </PrimaryPaletteSection>
        </ColorWheelSection>
    );
}
