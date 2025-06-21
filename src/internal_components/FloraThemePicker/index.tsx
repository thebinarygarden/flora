"use client"
import {RGB} from "./types";
import {useState} from "react";
import {BGColorWheel} from "./BGColorWheel";
import {ClientOnlyFadeIn} from "@components/util/client/ClientOnlyFadeIn";
import {ColorWheelContainer, ColorWheelSection, PrimaryPaletteSection, SeedContainer} from "./styles";
import {BrightnessColorPalette} from "./BGColorPalette/BrightnessColorPalette";
import {SaturationColorPalette} from "./BGColorPalette/SaturationColorPalette";
import {InputText} from "@components/input/forms/InputText";
import {rgbToHex} from "./rgbToHex";

export function BGThemePicker() {
    const [currentColor, setCurrentColor] = useState<RGB>({r: 0, g: 0, b: 0});
    const [seed, setSeed] = useState(rgbToHex(currentColor));

    return (
        <ClientOnlyFadeIn>
            <SeedContainer>HEX Seed:
                <InputText
                    value={seed}
                    onChange={(event) => {
                        console.log("here")
                        setSeed(event.target.value)
                    }}
                />
            </SeedContainer>
            <ColorWheelSection>

                <ColorWheelContainer>
                    <BGColorWheel currentColor={currentColor} setCurrentColor={setCurrentColor}/>
                </ColorWheelContainer>
                <PrimaryPaletteSection>
                    Brightness
                    <BrightnessColorPalette color={currentColor}/>
                    Saturation
                    <SaturationColorPalette color={currentColor}/>
                </PrimaryPaletteSection>
            </ColorWheelSection>
        </ClientOnlyFadeIn>
    );
}
