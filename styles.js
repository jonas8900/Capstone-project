import { createGlobalStyle } from "styled-components";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --primary-color: #ff4d4d;
    --secondary-color: #FF3B17;
    --third-color: #ffc44d;
    --fifth-color: #4d17c9;
    --grey-topics: #757575;
    --font-size-headlines: 1rem;
    --font-size-details: 0.8rem;
    --font-weight-light: 300;
  }

  body {
    font-family: ${roboto.style.fontFamily};
    margin: 0;
    font-family: system-ui;
    font-size: 100%;
    width: 100%;
    height: 100%;
    max-width: 420px;
    margin-inline: auto;
  }

  h2 {
    font-size: var(--font-size-headline);
    margin-left: 40px;
    margin-bottom: 0px;
  }



`;
