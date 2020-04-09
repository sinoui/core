import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import { opacify } from 'polished';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import IndeterminateCheckBoxIcon from './svg-icons/IndeterminateCheckBox';
import CheckBoxOutlineBlank from './svg-icons/CheckBoxOutlineBlank';
import CheckBox from './svg-icons/CheckBox';

const BaseToggleButton = styled(BaseButton).attrs(() => ({
  forwardedAs: 'span',
  tabIndex: '0',
}))<Props>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0px;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  &::-moz-focus-inner {
    border-style: none;
  }

  pointer-events: default;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${({ theme, checked, indeterminate, color }) =>
    checked || indeterminate
      ? getColorFromTheme(theme, color)
      : theme.palette.text.secondary};

  & .sinoui-svg-icon {
    font-size: 24px;
  }

  &:hover {
    background-color: ${({ theme, color, checked, indeterminate }) =>
      !checked && !indeterminate
        ? theme.palette.action.hover
        : opacify(
            theme.palette.action.hoverOpacity - 1,
            getColorFromTheme(theme, color) as string,
          )};

    @media (hover: none) {
      background-color: transparent;
    }
  }
  &:focus {
    background-color: ${({ theme, color }) =>
      opacify(
        theme.palette.action.hoverOpacity - 1,
        getColorFromTheme(theme, color) as string,
      )};
  }

  &.sinoui-checkbox--disabled {
    cursor: default;
    pointer-events: none;
    background-color: transparent;
    color: ${(props) => props.theme.palette.text.disabled};
  }

  &.sinoui-checkbox--readOnly {
    color: ${(props) => props.theme.palette.text.disabled};
  }

  & .sinoui-checkbox__input {
    cursor: inherit;
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
    border: none;
  }

  & .sinoui-checkbox__ripple {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  & .sinoui-checkbox__ripple-layout {
    width: 40px;
    height: 40px;
  }
`;

export interface Props {
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 是否为部分选择状态
   */
  indeterminate?: boolean;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 名称
   */
  name?: string;
  /**
   * 复选框的值
   */
  value?: string;
  /**
   * 复选框发生状态变化时调用的回调函数
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * tab键索引
   */
  tabIndex?: number;
  /**
   * 引用input元素
   */
  inputRef?:
    | React.RefObject<HTMLInputElement>
    | ((dom: HTMLInputElement) => void);
  /**
   * 给input元素应用上新的属性
   */
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  /**
   * 给input元素应用上样式类
   */
  inputClassName?: string;
  /**
   * 点击时的回调函数
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 指定颜色
   */
  color?: string;
}

const checkedCheckboxIcon = <CheckBox />;
const checkboxIcon = <CheckBoxOutlineBlank />;
const indeterminateCheckboxIcon = <IndeterminateCheckBoxIcon />;

/**
 * 复选框按钮
 */
export default function BaseCheckboxButton(props: Props) {
  const {
    checked,
    disabled,
    inputProps,
    inputRef,
    name,
    onChange,
    tabIndex,
    value,
    className,
    readOnly,
    indeterminate,
    onClick,
    color = 'primary',
    inputClassName,
    ...rest
  } = props;

  /**
   * 图标显示
   */
  const iconWrapper = () => {
    let icon;
    if (indeterminate) {
      icon = indeterminateCheckboxIcon;
    } else if (checked) {
      icon = checkedCheckboxIcon;
    } else {
      icon = checkboxIcon;
    }
    return icon;
  };

  const rippleConfig = {
    center: true,
    rippleClassName: 'sinoui-checkbox__ripple',
    rippleLayoutClassName: 'sinoui-checkbox__ripple-layout',
    fixSize: true,
  };

  return (
    <BaseToggleButton
      disabled={disabled || readOnly}
      className={classNames('sinoui-checkbox', className, {
        'sinoui-checkbox--disabled': disabled,
        'sinoui-checkbox--checked': checked,
        'sinoui-checkbox--indeterminate': indeterminate,
        'sinoui-checkbox-readOnly': readOnly,
      })}
      color={color}
      onClick={onClick}
      ripple={rippleConfig}
      checked={checked}
      indeterminate={indeterminate}
      {...rest}
    >
      {iconWrapper()}
      <input
        className={classNames('sinoui-checkbox__input', inputClassName)}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={tabIndex}
        value={value}
        ref={inputRef}
        {...inputProps}
      />
    </BaseToggleButton>
  );
}
