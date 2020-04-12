import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import React from 'react';
import lineRippleStyle from './lineRippleStyle';
import { FILLED_INPUT_BGCOLOR } from './constant';

export interface FilledInputProps extends BaseInputProps {
  /**
   * 错误状态
   */
  error?: boolean;
  /**
   * 聚焦状态
   */
  focused?: boolean;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 无标签
   */
  noLabel?: boolean;
}

const denseStyle = css`
  padding-top: 19.5px;
  padding-bottom: 4.5px;
`;

const denseNoLabelStyle = css`
  padding-top: 3.5px;
  padding-bottom: 4.5px;
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
    margin-right: 0px;
    margin-left: 10px;
  }

  > .sinoui-input-adornment--start ~ .sinoui-base-input__input {
    margin-left: -6px;
  }

  > .sinoui-input-adornment--start.sinoui-input-adornment--text
    ~ .sinoui-base-input__input,
  > .sinoui-input-adornment--end.sinoui-input-adornment--text {
    margin-left: -12px;
  }

  > .sinoui-input-adornment--start,
  > .sinoui-input-adornment--text {
    transform: translateY(${({ noLabel }) => (noLabel ? 0 : 7.5)}px);
  }

  > .sinoui-base-input__input {
    padding: 23.5px 12px 8.5px;
    padding-top: ${({ noLabel }) => (noLabel ? 7.5 : 23.5)}px;
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
