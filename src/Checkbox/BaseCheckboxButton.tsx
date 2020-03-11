import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import colorCss from '@sinoui/core/utils/colorCss';
import IndeterminateCheckBoxIcon from './svg-icons/IndeterminateCheckBox';
import CheckBoxOutlineBlank from './svg-icons/CheckBoxOutlineBlank';
import CheckBox from './svg-icons/CheckBox';

const BaseToggleButton = styled(BaseButton)`
  position: relative;
  outline: none;
  border: 0px;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  &::-moz-focus-inner {
    border-style: none;
  }

  pointer-events: default;
  width: 20px;
  height: 20px;
  color: ${(props) => props.theme.palette.text.secondary};

  & .sinoui-svg-icon {
    font-size: 20px;
  }

  &.sinoui-checkbox-button__checked {
    ${colorCss('color')};
  }
  &.sinoui-checkbox-button__indeterminate {
    ${colorCss('color')};
  }

  &.sinoui-checkbox-button__disabled {
    cursor: default;
    pointer-events: none;
    color: ${(props) => props.theme.palette.action.disabled};
  }

  &:hover {
    background-color: transparent;
  }

  & .sinoui-checkbox-button-input {
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

  & .sinoui-checkbox-button__ripple {
    width: 48px;
    height: 48px;
    border-radius: 32px;
  }

  & .sinoui-checkbox-button__ripple-layout {
    left: -14px;
    top: -14px;
    width: 48px;
    height: 48px;
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
  } = props;

  /**
   * 图标显示
   */
  const iconWrapper = () => {
    let _icon;
    if (indeterminate) {
      _icon = indeterminateCheckboxIcon;
    } else if (checked) {
      _icon = checkedCheckboxIcon;
    } else {
      _icon = checkboxIcon;
    }
    return _icon;
  };

  const rippleConfig = {
    center: true,
    rippleClassName: 'sinoui-checkbox-button__ripple',
    rippleLayoutClassName: 'sinoui-checkbox-button__ripple-layout',
    fixSize: true,
  };

  return (
    <BaseToggleButton
      disabled={disabled || readOnly}
      className={classNames('sinoui-checkbox-button', className, {
        'sinoui-checkbox-button__disabled': disabled,
        'sinoui-checkbox-button__checked': checked,
        'sinoui-checkbox-button__indeterminate': indeterminate,
        'sinoui-checkbox-button__readOnly': readOnly,
      })}
      color={color}
      onClick={onClick}
      ripple={rippleConfig}
      data-testid="checkbox"
    >
      {iconWrapper()}
      <input
        className={classNames(
          'sinoui-checkbox-button-input',
          props.inputClassName,
        )}
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
