import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { useRipple } from '@sinoui/ripple';
import Color from 'color';
import { Theme } from '@sinoui/theme';
import { getColorFromTheme } from '../utils/color';

export interface Props {
  inputClassName?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * 给input元素应用上新的属性
   */
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  color?: string;
}

interface WrapperProps {
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  focused?: boolean;
  theme: Theme;
}

function getColor(props: WrapperProps) {
  return getColorFromTheme(props, props.theme.typography.button.color);
}

export const getHoverBgColor = (props: WrapperProps) => {
  const mainColor = getColor(props);
  if (mainColor && mainColor !== 'inherit' && mainColor !== 'currentColor') {
    return Color(mainColor)
      .alpha(0.12)
      .rgb()
      .string();
  }
  return null;
};

const checkedWrapperStyle = css<WrapperProps>`
  transform: translateX(50%);
  color: ${(props) =>
    getColorFromTheme({
      color: props.color || 'primary',
      theme: props.theme,
      disabled: props.disabled,
    })};

  &:hover {
    background-color: ${(props) =>
      getHoverBgColor({
        color: props.color || 'primary',
        theme: props.theme,
        disabled: props.disabled,
      })};
  }
`;

const disabledWrapperStyle = css<WrapperProps>`
  color: ${(props) =>
    props.theme.palette.type === 'light' ? '#bdbdbd' : '#424242'};

  &:hover {
    background-color: transparent;
  }
`;

const focusedWrapperStyle = css<WrapperProps>`
  background-color: ${(props) =>
    props.checked
      ? getHoverBgColor({
          color: props.color || 'primary',
          theme: props.theme,
          disabled: props.disabled,
        })
      : 'rgba(0, 0, 0, 0.08)'};
`;

const SwitchLabelWrapper = styled.span<WrapperProps>`
  display: flex;
  align-items: inherit;
  justify-content: inherit;
  position: absolute;
  top: 0;
  left: 0;
  color: ${(props) =>
    props.theme.palette.type === 'light' ? ' #fafafa' : '#bdbdbd'};
  z-index: 1;
  transition: ${(props) =>
    props.theme.transitions.create(['left', 'transform'], {
      duration: props.theme.transitions.duration.shortest,
    })};
  padding: 9px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${(props) => props.focused && focusedWrapperStyle};
  ${(props) => props.checked && checkedWrapperStyle};
  ${(props) => props.disabled && disabledWrapperStyle};

  & .sinoui-switch__input {
    top: 0;
    left: -100%;
    width: 300%;
    cursor: inherit;
    height: 100%;
    margin: 0;
    opacity: 0;
    padding: 0;
    z-index: 1;
    position: absolute;
  }

  & .sinoui-switch__thumb {
    width: 20px;
    height: 20px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    background-color: currentColor;
  }

  & .sinoui-switch__ripple {
    width: 38px;
    height: 38px;
  }

  & .sinoui-switch__ripple-layout {
    left: 0;
    top: 0;
    width: 38px;
    height: 38px;
  }
`;

/**
 * 开关控件标签组件，主要包括小圆点
 *
 * @export
 * @param {Props} props
 * @returns
 */
export default function SwitchLabel(props: Props) {
  const {
    inputClassName,
    checked,
    disabled,
    color,
    name,
    value,
    onChange,
    inputProps,
    inputRef,
  } = props;

  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => setFocused(true), []);

  const onBlur = useCallback(() => setFocused(false), []);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      onBlur();
    },
    [onBlur, onChange],
  );

  const rippleRef = useRipple<HTMLSpanElement>({
    center: true,
    fixSize: true,
    rippleClassName: 'sinoui-switch__ripple',
    rippleLayoutClassName: 'sinoui-switch__ripple-layout',
    disabled,
  });

  return (
    <SwitchLabelWrapper
      ref={rippleRef}
      checked={checked}
      disabled={disabled}
      color={color}
      className={classNames('sinoui-switch__label', {
        'sinoui-switch--focused': focused,
      })}
      focused={focused}
      data-testid="switchLabel"
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleOnChange}
        disabled={disabled}
        value={value}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        {...inputProps}
        className={classNames('sinoui-switch__input', inputClassName)}
      />
      <span className="sinoui-switch__thumb" />
    </SwitchLabelWrapper>
  );
}
