import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import React from 'react';
import lineRippleStyle from './lineRippleStyle';
import { FILLED_INPUT_BGCOLOR } from './constant';

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

const overlayStyle = css<{ focused?: boolean }>`
  > .sinoui-input__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: ${({ theme }) => theme.palette.text.primary};
    pointer-events: none;
    z-index: 2;
    transition: ${({ theme: { transitions } }) =>
      transitions.create('background-color', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shortest,
      })};
    opacity: ${({ focused }) => (focused ? 0.12 : 0)};
  }
  ${({ focused }) =>
    !focused &&
    `
      :hover > .sinoui-input__overlay {
        opacity: 0.04;
      }
  `}
`;

const FilledInputLayout = styled(BaseInput)<FilledInputProps>`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => FILLED_INPUT_BGCOLOR[theme.palette.type]};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: ${({ theme: { transitions } }) =>
    transitions.create('background-color', {
      duration: transitions.duration.shorter,
      easing: transitions.easing.easeOut,
    })};

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
  ${({ disabled }) => !disabled && overlayStyle}
`;

/**
 * 填充模式输入框
 */
const FilledInput = React.forwardRef<HTMLDivElement, FilledInputProps>(
  ({ children, ...props }, ref) => {
    return (
      <FilledInputLayout {...props} ref={ref}>
        {children}
        <div className="sinoui-input__overlay" />
      </FilledInputLayout>
    );
  },
);

export default FilledInput;
