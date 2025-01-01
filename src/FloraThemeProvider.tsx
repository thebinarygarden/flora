"use client"
import React from 'react';
import {ThemeProvider, useTheme} from 'styled-components';
import {FloraTheme} from "./types";

type FloraThemeProviderProps = {
    theme?: FloraTheme;
    isNight?: boolean;
    children: React.ReactNode;
}

export const useFloraTheme = (): FloraTheme => {
    const theme = useTheme() as FloraTheme;
    if (!theme) {
        throw new Error("useFloraTheme must be used within a FloraThemeProvider.");
    }
    return theme;
};

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
        secondary: props.theme?.secondary ?? "gray",
        onSecondary: props.theme?.onSecondary ?? "white",
        background: props.theme?.background ?? "#f0f0f0",
        onBackground: props.theme?.onBackground ?? "black",
        surface: props.theme?.surface ?? "#FFFFFF",
        onSurface: props.theme?.onSurface ?? "black",
        fontMain: props.theme?.fontMain ?? "Arial",
        fontSecondary: props.theme?.fontSecondary ?? "Times New Roman",
        fontHeader: props.theme?.fontHeader ?? "sans-serif"
    };

    if(props.isNight != null) {
        theme = props.isNight ? { // TODO darken if is night
            primary: props.theme?.primary ?? "white",
            onPrimary: props.theme?.onPrimary ?? "black",
            secondary: props.theme?.secondary ?? "gray",
            onSecondary: props.theme?.onSecondary ?? "white",
            background: props.theme?.background ?? "#f0f0f0",
            onBackground: props.theme?.onBackground ?? "black",
            surface: props.theme?.surface ?? "#FFFFFF",
            onSurface: props.theme?.onSurface ?? "black",
            fontMain: props.theme?.fontMain ?? "Arial",
            fontSecondary: props.theme?.fontSecondary ?? "Times New Roman",
            fontHeader: props.theme?.fontHeader ?? "sans-serif"
        } : {
            primary: props.theme?.primary ?? "white",
            onPrimary: props.theme?.onPrimary ?? "black",
            secondary: props.theme?.secondary ?? "gray",
            onSecondary: props.theme?.onSecondary ?? "white",
            background: props.theme?.background ?? "#f0f0f0",
            onBackground: props.theme?.onBackground ?? "black",
            surface: props.theme?.surface ?? "#FFFFFF",
            onSurface: props.theme?.onSurface ?? "black",
            fontMain: props.theme?.fontMain ?? "Arial",
            fontSecondary: props.theme?.fontSecondary ?? "Times New Roman",
            fontHeader: props.theme?.fontHeader ?? "sans-serif"
        };
    }

    return theme;
}

export { FloraThemeProvider };