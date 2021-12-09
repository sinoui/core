import classNames from 'classnames';
import { opacify } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import BaseButton from '../BaseButton';
import getColorFromTheme from '../utils/getColorFromTheme';

export interface ToggleButtonProps {
  /**
   * 是否被选中，默认为false
   */
  selected?: boolean;
  /**
   * 值
   */
  value: string;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 指定颜色
   */
  color?: string;
  /**
   * 是否可用
   */
  disabled?: boolean;
  /**
   * 是否使用紧凑版
   */
  dense?: boolean;
}

const defaultButtonStyle = css<ToggleButtonProps>`
  ${({ theme }) => ({ ...theme.typography.button })};

  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : 'rgba(0,0,0,0.54)'};
  user-select: none;
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['color', 'background-color'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shortest,
    })};
  padding: ${({ dense }) => (dense ? 7 : 11)}px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.action.disabledBackground};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme, color }) =>
      opacify(
        theme.palette.action.hoverOpacity - 1,
        getColorFromTheme(theme, color) || theme.palette.primary.main,
      )};

    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const selectedStyle = css<ToggleButtonProps>`
  background-color: ${({ theme, color }) =>
    opacify(
      theme.palette.action.selectedOpacity - 1,
      getColorFromTheme(theme, color) || 'black',
    )};
  color: ${({ theme, color, disabled }) =>
    disabled
      ? theme.palette.text.disabled
      : getColorFromTheme(theme, color) || theme.palette.text.primary};

  &:hover {
    background-color: ${({ theme, color }) =>
      opacify(
        theme.palette.action.selectedOpacity - 1,
        getColorFromTheme(theme, color) || 'black',
      )};
    color: ${({ theme, color, disabled }) =>
      disabled
        ? theme.palette.text.disabled
        : getColorFromTheme(theme, color) || theme.palette.text.primary};

    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const ToggleButtonLayout = styled(BaseButton)<ToggleButtonProps>`
  ${defaultButtonStyle};
  ${({ selected }) => selected && selectedStyle};
`;

export default function ToggleButton(props: ToggleButtonProps) {
  const {
    children,
    onChange,
    selected,
    value,
    color,
    disabled,
    dense,
    ...rest
  } = props;

  const handleClcik = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <ToggleButtonLayout
      {...rest}
      className={classNames('sinoui-toggle-button', {
        'sinoui-toggle-button--selected': selected,
        'sinoui-toggle-button--dense': dense,
      })}
      color={color}
      disabled={disabled}
      dense={dense}
      value={value}
      selected={selected}
      onClick={handleClcik}
    >
      {children}
    </ToggleButtonLayout>
  );
}
