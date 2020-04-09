import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled from 'styled-components';
import lineRippleStyle from './lineRippleStyle';

export interface FilledInputProps extends BaseInputProps {
  error?: boolean;
  warning?: boolean;
  focused?: boolean;
  dense?: boolean;
}

/**
 * 填充模式输入框
 */
const FilledInput = styled(BaseInput)<
  BaseInputProps & { error?: boolean; warning?: boolean; dense?: boolean }
>`
  position: relative;
  background-color: ${(props) =>
    props.theme.palette.type === 'light'
      ? 'rgba(0,0,0,0.09)'
      : 'rgba(255,255,255,0.09)'};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: ${({ theme: { transitions } }) =>
    transitions.create('background-color', {
      duration: transitions.duration.shorter,
      easing: transitions.easing.easeOut,
    })};

  &:hover {
    ${(props) =>
      !props.disabled &&
      !props.readOnly &&
      !props.error &&
      `background-color: ${
        props.theme.palette.type === 'light'
          ? 'rgba(0,0,0,0.13)'
          : 'rgba(255,255,255,0.13)'
      };
      cursor:pointer;
  `}
  }

  > input,
  > textarea {
    padding: 27px 12px 10px;

    ${(props) => props.dense && `padding-top:23px;padding-bottom:6px;`}
  }

  ${lineRippleStyle}
`;

export default FilledInput;
