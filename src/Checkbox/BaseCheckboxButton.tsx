import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import { opacify } from 'polished';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import { Theme } from '@sinoui/theme';
import IndeterminateCheckBoxIcon from './svg-icons/IndeterminateCheckBox';
import CheckBoxOutlineBlank from './svg-icons/CheckBoxOutlineBlank';
import CheckBox from './svg-icons/CheckBox';

const colorWrapper = (props: Props) => {
  let color;
  if (props.theme) {
    if (props.disabled) {
      color = getColorFromTheme(props.theme, 'actionDisabled');
    } else if (props.checked) {
      color = getColorFromTheme(props.theme, props.color);
    } else {
      color = getColorFromTheme(props.theme, 'textSecondary');
    }
  }
  return color;
};

const BaseToggleButton = styled(BaseButton)`
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
  color: ${(props) => colorWrapper(props)};

  & .sinoui-svg-icon {
    font-size: 20px;
  }

  /* &:hover {
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.palette.action.hover};
    // Reset on touch devices, it doesn't add specificity
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
  } */

 

  &.sinoui-checkbox--disabled {
    cursor: default;
    pointer-events: none;
    background-color: transparent;
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
  theme?: Theme;
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
      })}
      color={color}
      onClick={onClick}
      ripple={rippleConfig}
      checked={checked}
      indeterminate={indeterminate}
      data-testid="checkbox"
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
