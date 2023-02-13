import { createGlobalStyle, css } from 'styled-components';

const Global = createGlobalStyle`
  *, ::before, ::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }
  ul {
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button, input {
    border: none;
    outline: none;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  html {
  }


  body {
    ${({ theme }) => css`
			font-family: ${theme.primaryFont};

			color: ${theme.colors.textColor};
			background-color: ${theme.colors.bgColor};
		`}

    font-size:16px;
    font-weight: 400;
    line-height: 1.6;

    transition: all 0.2s ease;

    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
      border-radius:10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255, 0.2);
      border-radius: 10px;
    }
  }
`;

export default Global;
