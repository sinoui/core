import React, { useState } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import { removeUndefinedProperties } from '@sinoui/core/utils/objects';
import FormGroup from './FormGroup';
import { toggleItem } from './arrays';

import Checkbox, { CheckboxProps } from '../Checkbox';

const PaddingRightStyle = css<{ labelPosition?: 'left' | 'right' }>`
  > label {
    padding-right: 8px;
  }
  > label:last-child {
    padding-right: 0px;
  }
`;

const marginLeftStyle = css`
  > label:first-child {
    margin-left: -12px;
  }
`;

const columnMarginLeftStyle = css`
  > label {
    margin-left: -12px;
  }
`;

const FormGroupWrapper = styled(FormGroup)<{
  column?: boolean;
  labelPosition?: 'left' | 'right';
}>`
  ${({ labelPosition, column }) =>
    labelPosition !== 'left' &&
    (column ? columnMarginLeftStyle : marginLeftStyle)}
  ${(props) => !props.column && PaddingRightStyle};
`;

export interface CheckboxGroupProps<T> {
  /**
   * 子元素。一般为一组`Checkbox`或者`<input type="checkbox" />`之类的
   */
  children?: React.ReactNode | any;
  /**
   * 复选框的值
   */
  value?: T[];
  /**
   * 值发生变化的回调函数
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | any>) => void;
  /**
   * 复选框不可用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readOnly?: boolean;
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
   * 设置是否纵向排列
   */
  column?: boolean;
  /**
   * 添加自定义类名
   */
  className?: string;
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
    onBlur,
    onFocus,
    color,
    onChange,
    items,
    className,
    ...rest
  } = props;

  const isControlled: boolean = typeof valueProp !== 'undefined';

  const [groupVal, setGroupVal] = useState(!isControlled && []);

  const getCheckboxValue = (checkboxProps: any) => {
    if (checkboxProps.value) {
      return checkboxProps.value;
    }
    if (checkboxProps.children && typeof checkboxProps.children === 'string') {
      return checkboxProps.children;
    }
    return undefined;
  };

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
   * 是否选中所有
   */
  const selectedAll = () => {
    const lists = getItemValues();
    const newValue = isControlled ? props.value : groupVal;
    return newValue && lists.every((_: T) => newValue.indexOf(_) !== -1);
  };

  /**
   *处理全选
   *
   * @private
   * @memberof CheckboxGroup
   */
  const onSelectAllClick = (event: React.MouseEvent<HTMLElement>) => {
    const newValue: any = isControlled ? props.value : groupVal;

    event.stopPropagation();
    const lists = getItemValues();
    if (selectedAll()) {
      const val: any =
        newValue && newValue.filter((el: T) => lists.indexOf(el) === -1);

      Object.defineProperty(event, 'target', {
        writable: true,
        value: { value: val },
      });

      if (!isControlled) {
        setGroupVal(val);
      }
      if (props.onChange) {
        props.onChange(event);
      }
    } else {
      const arr = new Set([...newValue, ...lists]);
      const newArr: any = Array.from(arr);

      Object.defineProperty(event, 'target', {
        writable: true,
        value: { value: newArr },
      });

      if (!isControlled) {
        setGroupVal(newArr);
      }
      if (props.onChange) {
        props.onChange(event);
      }
    }
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
    const el: any = isControlled ? valueProp : groupVal;
    const val: any = toggleItem<T>(el, checkboxValue);

    if (props.readOnly) {
      return;
    }
    if (!isControlled) {
      setGroupVal(val);
    }

    if (props.onChange) {
      event.stopPropagation();
      Object.defineProperty(event, 'target', {
        writable: true,
        value: { value: val },
      });
      props.onChange(event);
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
    const newValue = isControlled ? props.value : groupVal;
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
  const newValue = isControlled ? valueProp : groupVal;

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
      className={classNames('sinoui-checkbox-group', className)}
      labelPosition={labelPosition}
    >
      {renderSelectAll()}
      {items ? items.map(child) : React.Children.map(children, child)}
    </FormGroupWrapper>
  );
}

export default CheckboxGroup;
