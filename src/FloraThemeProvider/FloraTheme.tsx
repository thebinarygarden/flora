type FloraThemeProviderProps = {
    theme?: FloraTheme;  // Use an index signature if theme structure is not predefined
    children: React.ReactNode;
}

type FloraTheme = {
    primary?: string,
    primaryNight?: string,
    secondary?: string,
    secondaryNight?: string,
    background?: string,
    backgroundNight?: string,
    surface?: string,
    surfaceNight?: string,
}

export {FloraThemeProviderProps, FloraTheme}