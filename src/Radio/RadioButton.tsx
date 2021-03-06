import React, { useState } from 'react';
import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import { opacify } from 'polished';
import classNames from 'classnames';
import RadioButtonCheckedIcon from './svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from './svg-icons/RadioButtonUnchecked';

const ToggleButton = styled(BaseButton).attrs(() => ({
  forwardedAs: 'span',
  tabIndex: '0',
}))<{ checked?: boolean }>`
  > .sinoui-icon,
  > .sinoui-svg-icon {
    font-size: 20px;
  }
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${({ theme, checked, color }) =>
    checked ? getColorFromTheme(theme, color) : theme.palette.text.secondary};
  &.sinoui-radio--disabled {
    color: ${(props) => props.theme.palette.text.disabled};
  }

  &.sinoui-radio--readOnly {
    color: ${(props) => props.theme.palette.text.disabled};
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

  &:hover {
    background-color: ${({ theme, color, checked }) =>
      !checked
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

  &.sinoui-radio--dense {
    height: 32px;
    width: 32px;

    & .sinoui-radio__ripple {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    & .sinoui-radio__ripple-layout {
      width: 32px;
      height: 32px;
    }
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

export interface Props {
  /**
   * 是否被选中
   */
  checked?: boolean;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
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
  onChange?: (checked: boolean | any) => void;
  /**
   * 键盘事件
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
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
  /**
   * 给input元素应用上样式类
   */
  inputClassName?: string;
  /**
   * true 表示是密集模式
   */
  dense?: boolean;
}

/**
 * 基本展示组件
 */
function RadioButton(props: Props) {
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
      props.onChange(event.target.checked);
    }
  };

  const {
    checked: checkedProp,
    disabled: disabledProp,
    inputProps,
    inputRef,
    name,
    onChange,
    tabIndex,
    value,
    readOnly: readOnlyProp,
    color = 'primary',
    className,
    inputClassName,
    dense,
    ...other
  } = props;

  const checkedNew = isControlled ? checkedProp : check;

  const icon = checkedNew ? (
    <RadioButtonCheckedIcon />
  ) : (
    <RadioButtonUncheckedIcon />
  );

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
        'sinoui-radio--readOnly': readOnlyProp,
        'sinoui-radio--dense': dense,
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
        className={classNames('sinoui-radio__input', inputClassName)}
      />
    </ToggleButton>
  );
}

export default RadioButton;
