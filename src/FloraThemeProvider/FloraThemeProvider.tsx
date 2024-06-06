import React from 'react';
import { ThemeProvider } from 'styled-components';
import {FloraThemeProviderProps} from "./FloraTheme";

const FloraThemeProvider = (props: FloraThemeProviderProps) => {
    const theme = {
        primary: props.theme?.primary ?? "white",
        secondary: 'cream',
    };
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}

export default FloraThemeProvider;