import React, { useState } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import FormGroup from './FormGroup';
import { removeUndefinedProperties } from './objects';

const PaddingRightStyle = css`
  > label {
    padding-right: 8px;
  }
  > label:last-child {
    padding-right: 0px;
  }
`;

const FormGroupWrapper = styled(FormGroup)<{ block?: boolean }>`
  &.sinoui-radio-group__block > .sinoui-form-control-label {
    width: 100%;
  }

  ${(props) => !props.block && PaddingRightStyle};
`;

export interface RadioGroupProps {
  /**
   * 子元素。一般为一组`Radio`组件。
   */
  children: React.ReactNode | any;
  /**
   * 选中选项的值
   */
  value?: string | number;
  /**
   * 值发生变化事件监听器。
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number,
    form?: any,
  ) => void;
  /**
   * 标题位置。默认为right，标题会显示在radio图标的右侧。
   */
  labelPosition?: 'left' | 'right';
  /**
   * 密级模式。在密级模式下，radio的尺寸会减小。
   */
  dense?: boolean;
  /**
   * 组件处于不可用状态。
   */
  disabled?: boolean;
  /**
   * 监听焦点失去事件。
   */
  onBlur?: () => void;
  /**
   * 监听焦点获取事件。
   */
  onFocus?: () => void;
  /**
   * 指定Radio的颜色。
   */
  color?: boolean;
  /**
   * 只读。
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
   * 指定额外的样式
   */
  className?: string;
  /**
   * 是否纵向排列
   */
  block?: boolean;
}

/**
 * 单选按钮组组件。如果没有指定value属性或者value属性值为undefined时，RadioGroup组件就处于非受控状态，会自身维护选中状态。
 */
function RadioGroup(props: RadioGroupProps) {
  const isControlled: boolean = typeof props.value !== 'undefined';
  const [value, setValue] = useState<string | number | any>(
    !isControlled && null,
  );

  const onRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (props.readOnly) {
      return;
    }

    if (checked && props.onChange) {
      if (!isControlled) {
        setValue(event.target.value);
      }

      event.stopPropagation();
      props.onChange(event, event.target.value);
    }
  };

  const {
    children,
    value: valueProp,
    labelPosition,
    dense,
    disabled,
    onFocus,
    onBlur,
    color,
    readOnly,
    onChange,
    block,
    ...rest
  } = props;
  const valueNew = isControlled ? valueProp : value;
  return (
    <FormGroupWrapper
      {...rest}
      className={classNames('sinoui-radio-group', props.className, {
        'sinoui-radio-group__block': block,
      })}
      block={block}
    >
      {React.Children.map(
        children,
        (radio: React.ReactElement<RadioGroupProps>) => {
          if (React.isValidElement(radio)) {
            const radioValue = radio.props.value || radio.props.children;
            const radioProps: {} = removeUndefinedProperties({
              checked: valueNew === radioValue,
              onChange: onRadioChange,
              dense,
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
