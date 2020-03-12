import React, { useState } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import { removeUndefinedProperties } from '@sinoui/core/utils/objects';
import FormGroup from './FormGroup';

const PaddingRightStyle = css`
  > label {
    padding-right: 8px;
  }
  > label:last-child {
    padding-right: 0px;
  }
`;

const FormGroupWrapper = styled(FormGroup)<{ block?: boolean }>`
  &.sinoui-radio-group--block > .sinoui-form-control-label {
    width: 100%;
  }

  ${(props) => !props.block && PaddingRightStyle};
`;

export interface RadioGroupProps {
  /**
   * 子元素。一般为一组`Radio`组件
   */
  children: React.ReactNode | any;
  /**
   * 选中选项的值
   */
  value?: string | number;
  /**
   * 值发生变化事件监听器
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number,
    form?: any,
  ) => void;
  /**
   * 标题位置。默认为right，标题会显示在radio图标的右侧
   */
  labelPosition?: 'left' | 'right';
  /**
   * 组件处于不可用状态
   */
  disabled?: boolean;
  /**
   * 监听焦点失去事件
   */
  onBlur?: () => void;
  /**
   * 监听焦点获取事件
   */
  onFocus?: () => void;
  /**
   * 指定Radio的颜色
   */
  color?: boolean;
  /**
   * 只读
   */
  readOnly?: boolean;
  /**
   * 错误状态
   */
  error?: any;
  /**
   * 指定dom的id
   */
  id?: string;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 设置是否纵向排列
   */
  block?: boolean;
}

/**
 * 单选按钮组组件。如果没有指定value属性或者value属性值为undefined时，RadioGroup组件就处于非受控状态，会自身维护选中状态。
 */
function RadioGroup(props: RadioGroupProps) {
  const { value } = props;
  const isControlled: boolean = typeof value !== 'undefined';
  const [val, setVal] = useState<string | number | any>(!isControlled && null);

  const onRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (props.readOnly) {
      return;
    }

    if (checked && props.onChange) {
      if (!isControlled) {
        setVal(event.target.value);
      }

      event.stopPropagation();
      props.onChange(event, event.target.value);
    }
  };

  const {
    children,
    value: valueProp,
    labelPosition,
    disabled,
    onFocus,
    onBlur,
    color,
    readOnly,
    onChange,
    block,
    className,
    ...rest
  } = props;
  const valueNew = isControlled ? valueProp : val;
  return (
    <FormGroupWrapper
      {...rest}
      className={classNames('sinoui-radio-group', className, {
        'sinoui-radio-group--block': block,
        'sinoui-radio-group--disabled': disabled,
        'sinoui-radio-group--readOnly': readOnly,
      })}
      block={block}
      data-testid="radioGroup"
    >
      {React.Children.map(
        children,
        (radio: React.ReactElement<RadioGroupProps>) => {
          if (React.isValidElement(radio)) {
            const radioValue = radio.props.value || radio.props.children;
            const radioProps: {} = removeUndefinedProperties({
              checked: valueNew === radioValue,
              onChange: onRadioChange,
              disabled: radio.props.disabled || disabled,
              readOnly,
              onBlur: !readOnly && onBlur,
              onFocus: !readOnly && onFocus,
              color,
              labelPosition,
            });
            return React.cloneElement(radio, radioProps);
          }
          return radio;
        },
      )}
    </FormGroupWrapper>
  );
}

export default RadioGroup;
