import type { BaseInputProps } from '@sinoui/core/BaseInput';
import BaseInput from '@sinoui/core/BaseInput';
import React from 'react';
import styled, { css } from 'styled-components';

import { FILLED_INPUT_BGCOLOR } from './constant';
import lineRippleStyle from './lineRippleStyle';

/**
 * 填充模式下输入框组件属性类型
 */
export interface FilledInputProps extends BaseInputProps {
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
  padding-top: 20.5px;
  padding-bottom: 3.5px;
`;

const denseNoLabelStyle = css`
  padding-top: 3.5px;
  padding-bottom: 3.5px;
`;

const overlayStyle = css<{
  /**
   * 组件处于聚焦状态
   */
  focused?: boolean;
}>`
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
  background-color: ${({ theme }) => FILLED_INPUT_BGCOLOR[theme.palette.type]};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: ${({ theme: { transitions } }) =>
    transitions.create('background-color', {
      duration: transitions.duration.shorter,
      easing: transitions.easing.easeOut,
    })};

  > .sinoui-input-adornment--end {
    margin-right: ${({ multiline }) => (multiline ? 0 : 12)}px;
    margin-left: -6px;
  }

  > .sinoui-input-adornment--start {
    margin-right: 0px;
    margin-left: ${({ multiline }) => (multiline ? -4 : 10)}px;
  }

  > .sinoui-input-adornment--start ~ .sinoui-base-input__input {
    margin-left: -6px;
  }

  > .sinoui-input-adornment--start.sinoui-input-adornment--text
    ~ .sinoui-base-input__input,
  > .sinoui-input-adornment--end.sinoui-input-adornment--text {
    margin-left: ${({ multiline }) => (multiline ? 0 : -12)}px;
  }

  > .sinoui-input-adornment--start,
  > .sinoui-input-adornment--text {
    transform: translateY(${({ noLabel }) => (noLabel ? 0 : 7.5)}px);
  }

  ${({ multiline }) => (multiline ? '&' : '> .sinoui-base-input__input')} {
    padding: 22px 12px 10px;
    padding-top: ${({ noLabel }) => (noLabel ? 7.5 : 25.5)}px;
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
  function FilledInput({ children, ...props }, ref) {
    return (
      <FilledInputLayout {...props} ref={ref}>
        {children}
        <div className="sinoui-input__overlay" />
      </FilledInputLayout>
    );
  },
);

export default FilledInput;
