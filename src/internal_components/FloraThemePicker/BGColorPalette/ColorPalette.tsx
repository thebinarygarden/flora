import {ColorPaletteProps} from "../types";
import {ColorPaletteContainer, ColorSwatch} from "../styles";
import {rgbToHex} from "../rgbToHex";

export const ColorPalette = ({colors, vertical}: ColorPaletteProps) => {
    return (
        <ColorPaletteContainer $vertical={Boolean(vertical) ? "true" : null}>
            {colors.map((c, enumerate) => <ColorSwatch key={enumerate} color={rgbToHex(c)} $vertical={Boolean(vertical) ? "true" : null} />)}
        </ColorPaletteContainer>
    );
}