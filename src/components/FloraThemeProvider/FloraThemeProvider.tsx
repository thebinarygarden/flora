import React from 'react';
import { ThemeProvider } from 'styled-components';
import {FloraTheme} from "./FloraTheme";
type FloraThemeProviderProps = {
    theme?: FloraTheme;
    isNight?: boolean;
    children: React.ReactNode;
}

const FloraThemeProvider = (props: FloraThemeProviderProps) => {
    return (
        <ThemeProvider theme={createTheme(props)}>
            {props.children}
        </ThemeProvider>
    );
}

const createTheme = (props: FloraThemeProviderProps): FloraTheme => {
    let theme: FloraTheme = {
        primary: props.theme?.primary ?? "white",
        onPrimary: props.theme?.onPrimary ?? "black",
        primaryNight: props.theme?.primaryNight ?? "#121212",
        onPrimaryNight: props.theme?.onPrimaryNight ?? "white",
        secondary: props.theme?.secondary ?? "gray",
        onSecondary: props.theme?.onSecondary ?? "white",
        secondaryNight: props.theme?.secondaryNight ?? "#333333",
        onSecondaryNight: props.theme?.onSecondaryNight ?? "white",
        background: props.theme?.background ?? "#f0f0f0",
        onBackground: props.theme?.onBackground ?? "black",
        backgroundNight: props.theme?.backgroundNight ?? "#181818",
        onBackgroundNight: props.theme?.onBackgroundNight ?? "white",
        surface: props.theme?.surface ?? "#FFFFFF",
        onSurface: props.theme?.onSurface ?? "black",
        surfaceNight: props.theme?.surfaceNight ?? "#242424",
        onSurfaceNight: props.theme?.onSurfaceNight ?? "white",
        fontMain: props.theme?.fontMain ?? "Arial",
        fontSecondary: props.theme?.fontSecondary ?? "Times New Roman",
        fontHeader: props.theme?.fontHeader ?? "sans-serif"
    };

    if(props.isNight != null) {
        theme = props.isNight ? {
            primary: props.theme?.primaryNight ?? "#121212",
            onPrimary: props.theme?.onPrimaryNight ?? "white",
            primaryNight: props.theme?.primaryNight ?? "#121212",
            onPrimaryNight: props.theme?.onPrimaryNight ?? "white",
            secondary: props.theme?.secondary ?? "gray",
            onSecondary: props.theme?.onSecondary ?? "white",
            secondaryNight: props.theme?.secondaryNight ?? "#333333",
            onSecondaryNight: props.theme?.onSecondaryNight ?? "white",
            background: props.theme?.background ?? "#f0f0f0",
            onBackground: props.theme?.onBackground ?? "black",
            backgroundNight: props.theme?.backgroundNight ?? "#181818",
            onBackgroundNight: props.theme?.onBackgroundNight ?? "white",
            surface: props.theme?.surface ?? "#FFFFFF",
            onSurface: props.theme?.onSurface ?? "black",
            surfaceNight: props.theme?.surfaceNight ?? "#242424",
            onSurfaceNight: props.theme?.onSurfaceNight ?? "white",
            fontMain: props.theme?.fontMain ?? "Arial",
            fontSecondary: props.theme?.fontSecondary ?? "Times New Roman",
            fontHeader: props.theme?.fontHeader ?? "sans-serif"
        } : {
            primary: props.theme?.primary ?? "white",
            onPrimary: props.theme?.onPrimary ?? "black",
            primaryNight: props.theme?.primaryNight ?? "#121212",
            onPrimaryNight: props.theme?.onPrimaryNight ?? "white",
            secondary: props.theme?.secondary ?? "gray",
            onSecondary: props.theme?.onSecondary ?? "white",
            secondaryNight: props.theme?.secondaryNight ?? "#333333",
            onSecondaryNight: props.theme?.onSecondaryNight ?? "white",
            background: props.theme?.background ?? "#f0f0f0",
            onBackground: props.theme?.onBackground ?? "black",
            backgroundNight: props.theme?.backgroundNight ?? "#181818",
            onBackgroundNight: props.theme?.onBackgroundNight ?? "white",
            surface: props.theme?.surface ?? "#FFFFFF",
            onSurface: props.theme?.onSurface ?? "black",
            surfaceNight: props.theme?.surfaceNight ?? "#242424",
            onSurfaceNight: props.theme?.onSurfaceNight ?? "white",
            fontMain: props.theme?.fontMain ?? "Arial",
            fontSecondary: props.theme?.fontSecondary ?? "Times New Roman",
            fontHeader: props.theme?.fontHeader ?? "sans-serif"
        };
    }

    return theme;
}

export { FloraThemeProvider };