import React, { useState } from 'react';
import styled from 'styled-components';
import RadioButtonCheckedIcon from './svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from './svg-icons/RadioButtonUnchecked';
import ToggleButton from './ToggleButton';

const StyleInput = styled.input`
  cursor: inherit;
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  border: none;
`;

export interface SwitchBaseProps {
  /**
   * 是否被选中
   */
  checked?: boolean;
  /**
   * 选中的图标
   */
  checkedIcon?: React.ReactChild;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 未选中的图标
   */
  icon?: React.ReactChild;
  /**
   * input的其它属性
   */
  inputProps?: string;
  /**
   * ref属性
   */
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * type属性
   */
  inputType?: string;
  /**
   * name属性
   */
  name?: string;
  /**
   * 值发生变化的回调函数
   */
  onChange?: (event: React.ChangeEvent<HTMLElement>, checked: boolean) => void;
  /**
   * 指定获取焦点事件监听器
   */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * 指定失去焦点事件监听器
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * 键盘事件
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * tabIndex属性
   */
  tabIndex?: number;
  /**
   * 单选框的值
   */
  value?: string;
  /**
   * 是否默认选中
   */
  defaultChecked?: boolean;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 指定颜色
   */
  color?: string;
}

/**
 * 基本展示组件
 */
function SwitchBase(props: SwitchBaseProps) {
  const isControlled = props.checked != null;
  const [checked, setChecked] = useState(
    !isControlled &&
      (props.defaultChecked !== undefined ? props.defaultChecked : false),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (props.readOnly) {
      return;
    }

    if (!isControlled) {
      setChecked(checked);
    }

    if (props.onChange) {
      props.onChange(event, checked);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (props.readOnly) {
      return;
    }

    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (props.readOnly) {
      return;
    }

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const {
    checked: checkedProp,
    checkedIcon = <RadioButtonCheckedIcon />,
    disabled: disabledProp,
    icon: iconProp = <RadioButtonUncheckedIcon />,
    inputProps,
    inputRef,
    inputType = 'checkbox',
    name,
    onChange,
    tabIndex,
    value,
    readOnly: readOnlyProp,
    color = 'primary',
    ...other
  } = props;

  const checkedNew = isControlled ? checkedProp : checked;

  let icon = checkedNew ? checkedIcon : iconProp;

  return (
    <ToggleButton
      checked={checkedNew}
      disabled={disabledProp || readOnlyProp}
      color={color}
      {...other}
    >
      {icon}
      <StyleInput
        type={inputType}
        name={name}
        checked={isControlled ? checkedProp : undefined}
        onChange={handleInputChange}
        disabled={disabledProp}
        readOnly={readOnlyProp}
        tabIndex={tabIndex}
        value={value}
        ref={inputRef}
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </ToggleButton>
  );
}

export default SwitchBase;
