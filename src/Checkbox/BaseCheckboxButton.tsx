import React from 'react';
import classNames from 'classnames';
import IndeterminateCheckBoxIcon from './svg-icons/IndeterminateCheckBox';
import CheckBoxOutlineBlank from './svg-icons/CheckBoxOutlineBlank';
import CheckBox from './svg-icons/CheckBox';
import BaseToggleButton from './BaseToggleButton';

export interface Props {
  /**
   * 是否选中。如果为`true`，则显示选中的复选框样式。
   */
  checked?: boolean;
  /**
   * 是否为部分选择状态。如果为`true`，则复选框显示部分选择图标。
   */
  indeterminate?: boolean;
  /**
   * 是否禁用。如果为`true`，则此复选框不可用。
   */
  disabled?: boolean;
  /**
   * 是否只读。如果为`true`，则复选框只读。
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
   * 复选框发生状态变化时调用的回调函数。
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 给根元素添加上样式类
   */
  className?: string;
  /**
   * 给根元素应用上样式
   */
  style?: React.CSSProperties;
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
   * 如果为`true`，则显示密集模式下的复选框样式
   */
  dense?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 指定主题颜色
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
    dense,
    onClick,
  } = props;

  const _icon = indeterminate
    ? indeterminateCheckboxIcon
    : checked
    ? checkedCheckboxIcon
    : checkboxIcon;

  return (
    <BaseToggleButton
      checked={checked}
      disabled={disabled || readOnly}
      className={classNames('sinoui-checkbox-button', className)}
      color={props.color}
      dense={dense}
      onClick={onClick}
    >
      {_icon}
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
