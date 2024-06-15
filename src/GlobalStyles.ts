import { createGlobalStyle } from 'styled-components'
import {FloraTheme} from "./components/FloraThemeProvider";

export const FloraGlobalStyle = createGlobalStyle<FloraTheme>`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.onBackground};
  }

  @media (prefers-color-scheme: dark) {
    body {
      background: ${props => props.theme.backgroundNight};
      color: ${props => props.theme.onBackgroundNight}
    }
  }
`