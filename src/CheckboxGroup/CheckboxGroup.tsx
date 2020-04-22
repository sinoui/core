import React from 'react';
import classNames from 'classnames';
import FormGroup from '@sinoui/core/FormGroup';
import Checkbox from '@sinoui/core/Checkbox';
import { toggleItem } from './arrays';
import type CheckboxGroupItem from './CheckboxGroupItem';

export interface CheckboxGroupProps<T> {
  /**
   * 子元素。一般为一组`Checkbox`或者`<input type="checkbox" />`之类的
   */
  children?: React.ReactNode;
  /**
   * 复选框的值
   */
  value?: T[];
  /**
   * 值发生变化的回调函数
   */
  onChange?: (value: T[]) => void;
  /**
   * 不可用
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
   * 添加自定义类名
   */
  className?: string;
  /**
   * 指定Checkbox的颜色
   */
  color?: string;
  /**
   * dom元素的id
   */
  id?: string;
  /**
   * 设置是否纵向排列
   */
  column?: boolean;
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
  items?: CheckboxGroupItem<T>[];
  /**
   * true 表示是密集模式
   */
  dense?: boolean;
}

/**
 * 从子节点中解析出选项
 *
 * @param children 子节点
 */
const parseItemsFromChildren = (
  children: React.ReactNode,
): CheckboxGroupItem<any>[] => {
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
 * 复选框组组件。不指定value属性时，此组件为非受控状态，自身维护选中状态
 */
function CheckboxGroup<T = string>(props: CheckboxGroupProps<T>) {
  const {
    children,
    value = [],
    labelPosition,
    disabled,
    readOnly,
    color,
    onChange,
    className,
    enableSelectAll,
    items = parseItemsFromChildren(children),
    dense,
    ...rest
  } = props;

  const isSelectedAll =
    value &&
    value.length === items.length &&
    items.every((item) => value.includes(item.value));

  /**
   * 处理全选
   */
  const onSelectAllClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (onChange) {
      onChange(isSelectedAll ? [] : items.map((item) => item.value));
    }
  };

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
      const newValue = toggleItem<T>(value, itemValue);
      onChange(newValue);
    }
  };

  /**
   * 渲染全选复选框
   *
   * @private
   * @returns
   * @memberof CheckboxGroup
   */
  const renderSelectAll = () => {
    const selectAll = enableSelectAll && (
      <Checkbox
        indeterminate={!isSelectedAll && value.length > 0}
        onClick={onSelectAllClick}
        checked={isSelectedAll}
        readOnly={props.readOnly}
        disabled={props.disabled}
        className="sinoui-checkbox-group__select-all"
      >
        全选
      </Checkbox>
    );

    return selectAll;
  };

  return (
    <FormGroup
      {...rest}
      dense={dense}
      className={classNames('sinoui-checkbox-group', className)}
      disabledIndent={labelPosition === 'left'}
      onChange={(event) => event.stopPropagation()}
    >
      {renderSelectAll()}
      {items.map((item) => (
        <Checkbox
          key={item.id ?? item.value}
          value={item.value}
          readOnly={readOnly}
          disabled={disabled}
          dense={dense}
          labelPosition={labelPosition}
          color={color}
          onClick={handleItemClick(item.value)}
          checked={value.includes(item.value)}
        >
          {item.label}
        </Checkbox>
      ))}
    </FormGroup>
  );
}

export default CheckboxGroup;
