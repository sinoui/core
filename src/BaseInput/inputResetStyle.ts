import { css } from 'styled-components';

/**
 * 输入框重置样式
 */
const inputResetStyle = css`
  display: block;
  flex: 1 1 auto;
  line-height: inherit;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  border: none;
  box-sizing: content-box;
  background: none;
  margin: 0px;
  -webkit-tap-highlight-color: transparent;
  min-width: 0px;
  width: 100%;
  height: 1.5em;
  min-height: 1.5em;
  caret-color: ${({ theme }) => theme.palette.primary.main};

  ::-moz-placeholder {
    color: ${(props) => props.theme.palette.text.hint};
  }
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.palette.text.hint};
  }
  :-ms-input-placeholder {
    color: ${(props) => props.theme.palette.text.hint};
  }

  ::-ms-clear {
    display: none;
  }

  :focus {
    outline: 0;
  }

  :invalid {
    box-shadow: none;
    caret-color: ${({ theme }) => theme.palette.error.main};
  }
`;

export default inputResetStyle;
