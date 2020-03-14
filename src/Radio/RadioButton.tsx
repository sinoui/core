import React, { useState } from 'react';
import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import { Theme } from '@sinoui/theme';
import classNames from 'classnames';
import RadioButtonCheckedIcon from './svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from './svg-icons/RadioButtonUnchecked';

/**
 * 颜色
 */
const colorWrapper = (props: RadioButtonProps) => {
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

const ToggleButton = styled(BaseButton)`
  color: ${(props) => colorWrapper(props)};
  > .sinoui-icon,
  > .sinoui-svg-icon {
    font-size: 20px;
  }
  width: 40px;
  height: 40px;

  &:hover {
    background-color: transparent;
  }
  & .sinoui-radio__ripple {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  & .sinoui-radio__ripple-layout {
    width: 40px;
    height: 40px;
  }
`;

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

export interface RadioButtonProps {
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
  theme?: Theme;
}

/**
 * 基本展示组件
 */
function RadioButton(props: RadioButtonProps) {
  const { checked, defaultChecked } = props;
  const isControlled = checked != null;
  const [check, setCheck] = useState(
    !isControlled && (defaultChecked !== undefined ? defaultChecked : false),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.readOnly) {
      return;
    }

    if (!isControlled) {
      setCheck(event.target.checked);
    }

    if (props.onChange) {
      props.onChange(event, event.target.checked);
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
    name,
    onChange,
    tabIndex,
    value,
    readOnly: readOnlyProp,
    color = 'primary',
    className,
    ...other
  } = props;

  const checkedNew = isControlled ? checkedProp : check;

  const icon = checkedNew ? checkedIcon : iconProp;

  const rippleConfig = {
    center: true,
    rippleClassName: 'sinoui-radio__ripple',
    rippleLayoutClassName: 'sinoui-radio__ripple-layout',
    fixSize: true,
  };

  return (
    <ToggleButton
      checked={checkedNew}
      disabled={disabledProp || readOnlyProp}
      color={color}
      {...other}
      className={classNames('sinoui-radio', className, {
        'sinoui-radio--checked': checked,
        'sinoui-radio--disabled': disabledProp,
      })}
      ripple={rippleConfig}
    >
      {icon}
      <StyleInput
        type="radio"
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

export default RadioButton;
