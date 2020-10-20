import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #040405;
    --dark: #1f2023;
    --gray: #505050;
    --gray-300: #cccccc;
    --gray-700: #545864;
    --white: #ffffff;
    --active: #5f49e3;
    --input: #2e3034;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    font-family: Montserrat, Arial, sans-serif;

    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;

    background-color: var(--dark);
  }
`;

export default GlobalStyles;
