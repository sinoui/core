import React, { useState } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import FormGroup from './FormGroup';
import { toggleItem } from './arrays';
import { removeUndefinedProperties } from './objects';
import Checkbox, { CheckboxProps } from '../Checkbox';

const PaddingRightStyle = css`
  > .sinoui-form-control-label .sinoui-form-control-label__title {
    padding-right: 16px;
  }
  > .sinoui-form-control-label:last-child .sinoui-form-control-label__title {
    padding-right: 8px;
  }
`;

const FormGroupWrapper = styled(FormGroup)<{ column?: boolean }>`
  ${(props) => !props.column && PaddingRightStyle};
`;

export interface CheckboxGroupProps<T> {
  /**
   * 子节点。一般为一组`Checkbox`或者`<input type="checkbox" />`之类的
   */
  children?: React.ReactNode | any;
  /**
   * 复选框的值
   */
  value?: T[];
  /**
   * 值发生变化事件
   */
  onChange?: (value: T[]) => void;
  /**
   * 复选框不可用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readOnly?: boolean;
  /**
   * 是否是紧缩型
   */
  dense?: boolean;
  /**
   * 标题显示位置
   */
  labelPosition?: 'left' | 'right';
  /**
   * 指定失去焦点事件监听器
   */
  onBlur?: () => void;
  /**
   * 指定获取焦点事件监听器
   */
  onFocus?: () => void;
  /**
   * 纵向显示
   */
  column?: boolean;
  /**
   * 指定额外的样式
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
  /**
   * 指定Checkbox的颜色
   */
  color?: string;
  /**
   * 错误状态
   */
  error?: any;
  /**
   * dom元素的id
   */
  id?: string;
  /**
   * 网格对齐布局
   *
   * @type {boolean}
   * @memberof CheckboxGroupProps
   */
  gridLayout?: boolean;
  /**
   * 按照几列做网格布局，默认为3列
   *
   * @type {number}
   * @memberof CheckboxGroupProps
   */
  columns?: number;
  /**
   * 是否支持全选
   */
  enableSelectAll?: boolean;
  /**
   * 相当于children
   */
  items?: React.ReactElement<CheckboxProps<T>>[];
}

/**
 * 复选框组组件。不指定value属性时，此组件为非受控状态，自身维护选中状态
 */
function CheckboxGroup<T = string>(props: CheckboxGroupProps<T>) {
  const {
    children,
    value: valueProp,
    labelPosition,
    disabled,
    readOnly,
    dense,
    onBlur,
    onFocus,
    color,
    onChange,
    items,
    ...rest
  } = props;

  const isControlled: boolean =
    typeof props.value !== 'undefined' ? true : false;

  const [value, setValue] = useState(!isControlled && (valueProp || []));

  function getCheckboxValue(props: any) {
    if (props.value) {
      return props.value;
    }
    if (props.children && typeof props.children === 'string') {
      return props.children;
    }
    return undefined;
  }

  /**
   *获取所有子元素的值
   *
   * @private
   * @memberof CheckboxGroup
   */
  const getItemValues = () => {
    return React.Children.map(
      props.children,
      (item) =>
        item && React.isValidElement(item) && getCheckboxValue(item.props),
    ).filter(Boolean);
  };

  /**
   *处理全选
   *
   * @private
   * @memberof CheckboxGroup
   */
  const onSelectAllClick = (event: React.MouseEvent<HTMLElement>) => {
    const newValue: any = isControlled ? props.value : value;

    event.stopPropagation();
    const items = getItemValues();
    if (selectedAll()) {
      const val: T[] =
        newValue && newValue.filter((el: T) => items.indexOf(el) === -1);

      if (!isControlled) {
        setValue(val);
      }
      if (props.onChange) {
        props.onChange(val);
      }
    } else {
      const arr = new Set([...newValue, ...items]);
      const newArr = Array.from(arr);
      if (!isControlled) {
        setValue(newArr);
      }
      if (props.onChange) {
        props.onChange(newArr);
      }
    }
  };

  /**
   * 是否选中所有
   */
  const selectedAll = () => {
    const items = getItemValues();
    const newValue = isControlled ? props.value : value;
    return newValue && items.every((_) => newValue.indexOf(_) !== -1);
  };

  /**
   * 处理选中的值
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} event
   * @param {T} checkboxValue
   * @returns
   * @memberof CheckboxGroup
   */
  function onCheckboxChange<T>(
    event: React.ChangeEvent<HTMLInputElement>,
    checkboxValue: T,
  ) {
    const el: any = isControlled ? valueProp : value;
    const val: any = toggleItem<T>(el, checkboxValue);

    if (props.readOnly) {
      return;
    }
    if (!isControlled) {
      setValue(val);
    }

    if (props.onChange) {
      event.stopPropagation();
      props.onChange(val);
    }
  }

  /**
   * onChange事件
   */
  const onSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  /**
   * 渲染全选复选框
   *
   * @private
   * @returns
   * @memberof CheckboxGroup
   */
  const renderSelectAll = () => {
    const newValue = isControlled ? props.value : value;
    const selectAll = props.enableSelectAll && (
      <Checkbox
        indeterminate={newValue && newValue.length > 0 && !selectedAll()}
        onClick={onSelectAllClick}
        checked={selectedAll()}
        onChange={onSelectAllChange}
        readOnly={props.readOnly}
        disabled={props.disabled}
        className={classNames('sinoui-checkboxGroup-select', {
          'sinoui-checkboxGroup-selectAll': selectedAll(),
        })}
      >
        全选
      </Checkbox>
    );

    return selectAll;
  };
  const newValue = isControlled ? props.value : value;

  const child = (checkbox: React.ReactElement<CheckboxProps<T>>) => {
    if (React.isValidElement(checkbox)) {
      const checkboxProps: any = removeUndefinedProperties({
        checked:
          newValue && newValue.indexOf(getCheckboxValue(checkbox.props)) !== -1,
        onChange: (e: React.ChangeEvent<HTMLInputElement>, v: string) => {
          if (checkbox.props.onChange) {
            checkbox.props.onChange(e, v);
          }
          onCheckboxChange(e, checkbox.props.value);
        },
        labelPosition,
        disabled: checkbox.props.disabled || disabled,
        readOnly,
        dense,
        onBlur: !readOnly && onBlur,
        onFocus: !readOnly && onFocus,
        color,
        key: checkbox.props.value,
      });
      return React.cloneElement(checkbox, checkboxProps);
    }
    return checkbox;
  };

  return (
    <FormGroupWrapper
      {...rest}
      className={classNames('sinoui-checkbox-group', props.className)}
      data-testid="checkboxGroup"
    >
      {renderSelectAll()}
      {items ? items.map(child) : React.Children.map(children, child)}
    </FormGroupWrapper>
  );
}

export default CheckboxGroup;