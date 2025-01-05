import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: 'Space Grotesk', 'Orbitron', sans-serif;
    background: #0b0b0b;
    color: #fff;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  #root {
    padding-top: 60px; /* Aggiungi padding per evitare che il contenuto vada sotto la navbar */
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #121212;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff4be3, #7b2cbf);
    border-radius: 4px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

export default GlobalStyle;
