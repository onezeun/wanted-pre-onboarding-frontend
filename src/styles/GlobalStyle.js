import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  };

  body {
    background: #DBE2EF;
  };

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  };

  html, input, button {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
  };

  html, input, div, p {
    margin: 0;
    padding: 0;
  }

  h1 {
    fonr-weight: bold;
  };

  a {
    text-decoration: none;
    color: black;
    & ::hover {
      color: black;
    }
  };

  input:focus {outline:none;};
  textarea:focus {outline:none;};

  button {
    border: none;
    cursor:pointer;
  }
`;

export default GlobalStyle;