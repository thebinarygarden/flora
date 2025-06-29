"use client";
import { createGlobalStyle } from 'styled-components'
import {FloraTheme} from "../../types";

export const FloraGlobalStyle = createGlobalStyle<FloraTheme>`
  body {
    background: ${theme => theme.background};
    color: ${theme => theme.onBackground};
  }

  @media (prefers-color-scheme: dark) {
    body {
      background: ${theme => theme.background};
      color: ${theme => theme.onBackground}
    }
  }
  
  h1 {
    @media (orientation: portrait) {
      font-size: 10vw;
    }

    @media (orientation: landscape) {
      font-size: 10vh;
    }
  }

  h2 {
    @media (orientation: portrait) {
      font-size: 9vw;
    }

    @media (orientation: landscape) {
      font-size: 9vh;
    }
  }

  h3 {
    @media (orientation: portrait) {
      font-size: 8vw;
    }

    @media (orientation: landscape) {
      font-size: 8vh;
    }
  }

  h4 {
    @media (orientation: portrait) {
      font-size: 7vw;
    }

    @media (orientation: landscape) {
      font-size: 7vh;
    }
  }

  h5 {
    @media (orientation: portrait) {
      font-size: 6vw;
    }

    @media (orientation: landscape) {
      font-size: 6vh;
    }
  }

  h6 {
    @media (orientation: portrait) {
      font-size: 5vw;
    }

    @media (orientation: landscape) {
      font-size: 5vh;
    }
  }
  
  p {
    @media (orientation: portrait) {
      font-size: 3vw;
    }

    @media (orientation: landscape) {
      font-size: 3vh;
    }
  }
`