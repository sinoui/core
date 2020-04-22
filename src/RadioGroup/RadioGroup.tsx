import React from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import FormGroup from '@sinoui/core/FormGroup';
import Radio from '@sinoui/core/Radio';
import type RadioGroupItem from './RadioGroupItem';

const PaddingRightStyle = css`
  > label {
    padding-right: 8px;
  }
  > label:last-child {
    padding-right: 0px;
  }
`;

const labelStyle = css<{ dense?: boolean }>`
  transform: ${({ dense }) => `translate(-${dense ? 8 : 12}px, 0px)`};
`;

const FormGroupWrapper = styled(FormGroup)<{
  column?: boolean;
  labelPosition?: 'left' | 'right';
}>`
  &.sinoui-radio-group--column > .sinoui-form-control-label {
    width: 100%;
  }
  > label {
    ${({ labelPosition }) => labelPosition !== 'left' && labelStyle}
  }
  ${(props) => !props.column && PaddingRightStyle};
`;

export interface RadioGroupProps<T> {
  /**
   * 子元素。一般为一组`Radio`组件
   */
  children?: React.ReactNode | any;
  /**
   * 单选按钮的值
   */
  value?: T;
  /**
   * 值发生变化的回调函数
   */
  onChange?: (value?: T) => void;
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
  color?: string;
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
  column?: boolean;
  /**
   * true 表示是密集模式
   */
  dense?: boolean;
  /**
   * 相当于children
   */
  items?: RadioGroupItem<T>[];
}

/**
 * 从子节点中解析出选项
 *
 * @param children 子节点
 */
const parseItemsFromChildren = (
  children: React.ReactNode,
): RadioGroupItem<any>[] => {
  return (
    React.Children.map(children, (item) => {
      if (React.isValidElement(item) && item.props) {
        const { children: label, value = label, id = value } = item.props;
        return { id, value, label };
      }
      return null;
    })?.filter(Boolean) ?? []
  );
};

/**
 * 单选按钮组组件。
 */
function RadioGroup<T = string>(props: RadioGroupProps<T>) {
  const {
    children,
    value,
    labelPosition,
    disabled,
    onFocus,
    onBlur,
    color,
    readOnly,
    onChange,
    column,
    className,
    items = parseItemsFromChildren(children),
    dense,
    ...rest
  } = props;

  /**
   * 处理选项点击事件
   *
   * @param itemValue 选项值
   */
  const handleItemClick = (itemValue: T) => () => {
    if (readOnly) {
      return;
    }
    if (onChange) {
      if (value === itemValue) {
        onChange();
      } else {
        onChange(itemValue);
      }
    }
  };

  return (
    <FormGroupWrapper
      {...rest}
      className={classNames('sinoui-radio-group', className, {
        'sinoui-radio-group--column': column,
        'sinoui-radio-group--disabled': disabled,
        'sinoui-radio-group--readOnly': readOnly,
      })}
      column={column}
      labelPosition={labelPosition}
    >
      {items.map((item) => (
        <Radio
          key={item.id ?? item.value}
          value={item.value}
          readOnly={readOnly}
          disabled={disabled}
          dense={dense}
          labelPosition={labelPosition}
          color={color}
          checked={value === item.value}
          onClick={handleItemClick(item.value)}
        >
          {item.label}
        </Radio>
      ))}
    </FormGroupWrapper>
  );
}

export default RadioGroup;
