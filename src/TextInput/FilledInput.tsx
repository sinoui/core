import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import lineRippleStyle from './lineRippleStyle';
import {
  FILLED_INPUT_BGCOLOR,
  DISABLED_FILLED_INPUT_BGCOLOR,
} from './constant';

export interface FilledInputProps extends BaseInputProps {
  error?: boolean;
  warning?: boolean;
  focused?: boolean;
  dense?: boolean;
  noLabel?: boolean;
}

const denseStyle = css`
  padding-top: 22px;
  padding-bottom: 7px;
`;

const denseNoLabelStyle = css`
  padding-top: 6px;
  padding-bottom: 7px;
`;

/**
 * 填充模式输入框
 */
const FilledInput = styled(BaseInput)<FilledInputProps>`
  position: relative;
  background-color: ${({ disabled, theme }) =>
    (disabled ? DISABLED_FILLED_INPUT_BGCOLOR : FILLED_INPUT_BGCOLOR)[
      theme.palette.type
    ]};
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
      `background-color: ${props.theme.palette.action.selected};`}
  }

  > .sinoui-input-adornment--end {
    margin-right: 12px;
    margin-left: -6px;
  }

  > .sinoui-input-adornment--start {
    margin-left: 10px;
    margin-right: 0px;
    margin-top: 12px;
  }

  > .sinoui-input-adornment--start ~ input {
    margin-left: -8px;
  }

  > input,
  > textarea {
    padding: 26px 12px 11px;
    padding-top: ${({ noLabel }) => (noLabel ? 10 : 26)}px;
    ${({ noLabel, dense }) => !noLabel && dense && denseStyle}
    ${({ noLabel, dense }) => dense && noLabel && denseNoLabelStyle}
  }

  ${lineRippleStyle}
`;

export default FilledInput;
