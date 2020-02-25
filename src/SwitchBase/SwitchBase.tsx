import React, { useState } from 'react';
import CheckBoxOutlineBlankIcon from '../Checkbox/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../Checkbox/svg-icons/CheckBox';
import Icon from '../Icon';
import StyleInput from './StyleInput';
// import RippleInterface from '../BaseButton/RippleInterface';
import ToggleButton from './ToggleButton';

export interface Props {
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
   * 值发生变化事件
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
   * 值
   */
  value?: string;
  /**
   * 是否默认选中
   */
  defaultChecked?: boolean;
  /**
   * 指定额外的样式
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
}

function SwitchBase(props: Props) {
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

    // if (this.ripple) {
    //   this.ripple.handleFocus(event as React.FocusEvent<HTMLButtonElement>);
    // }
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (props.readOnly) {
      return;
    }

    // if (this.ripple) {
    //   this.ripple.handleBlur(event as React.FocusEvent<HTMLButtonElement>);
    // }
  };

  const {
    checked: checkedProp,
    checkedIcon = <CheckBoxIcon />,
    disabled: disabledProp,
    icon: iconProp = <CheckBoxOutlineBlankIcon />,
    inputProps,
    inputRef,
    inputType = 'checkbox',
    name,
    onChange,
    tabIndex,
    value,
    readOnly: readOnlyProp,
    ...other
  } = props;

  const checkedNew = isControlled ? checkedProp : checked;

  let icon = checkedNew ? checkedIcon : iconProp;

  if (typeof icon === 'string') {
    icon = <Icon>{icon}</Icon>;
  }

  return (
    <ToggleButton
      component="span"
      checked={checkedNew}
      disabled={disabledProp || readOnlyProp}
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
