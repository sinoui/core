import React from 'react';
import styled from 'styled-components';
import { isFragment } from 'react-is';
import classNames from 'classnames';
import { ToggleButtonProps } from '../ToggleButton';

export interface ToggleButtonGroupProps {
  /**
   * 选中项
   */
  value?: string | string[];
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string | string[]) => void;
  /**
   * 是否多选，默认为false
   */
  multiple?: boolean;
  /**
   * 指定选中状态下的按钮颜色
   */
  color?: string;
  /**
   * 子元素，一般为ToggleButton
   */
  children: React.ReactNode;
  /**
   * 设置紧凑模式
   */
  dense?: boolean;

  /**
   * 指定自定义的样式名称
   */
  className?: string;

  /**
   * 指定自定义样式
   */
  style?: React.CSSProperties;
}

const ToggleButtonGroupLayout = styled.div`
  .sinoui-toggle-button:not(:last-child) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
  }

  .sinoui-toggle-button:not(:first-child) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

/**
 * 转换所有的叶子节点
 *
 * * 过滤掉非元素节点
 * * 深度遍历 React.Fragment 子元素
 *
 * @param children 叶子节点
 * @param mapper 节点转换器
 * @returns 返回转换后的结果
 */
function transformAllChildren(
  children: React.ReactNode,
  mapper: (child: React.ReactElement, index: number) => React.ReactNode,
): React.ReactNode {
  return (
    <>
      {React.Children.map(children, (item, index) => {
        if (!React.isValidElement(item)) {
          return null;
        }
        if (isFragment(item)) {
          return transformAllChildren(item.props.children, mapper);
        }
        return mapper(item, index);
      })}
    </>
  );
}

const valueToArray = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
};

/**
 * 切换按钮组组件
 * @param props ToggleButtonGroupProps
 * @returns
 */
export default function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const {
    children,
    color,
    dense,
    value,
    multiple,
    onChange,
    className,
    ...rest
  } = props;
  const selectedItems = valueToArray(value);

  /**
   * 处理值变更
   */
  const handleChange = (selectedValue: string) => {
    if (multiple) {
      const newValue = [...selectedItems];
      const idx = newValue.indexOf(selectedValue);
      if (idx === -1) {
        newValue.push(selectedValue);
      } else {
        newValue.splice(idx, 1);
      }
      if (onChange) {
        onChange(newValue);
      }
    } else if (onChange) {
      onChange(
        selectedItems.includes(selectedValue) ? undefined : selectedValue,
      );
    }
  };

  return (
    <ToggleButtonGroupLayout
      className={classNames('sinoui-toggle-button-group', className)}
      {...rest}
    >
      {transformAllChildren(
        children,
        (item: React.ReactElement<ToggleButtonProps>, index: number) => {
          const childProps = {
            color,
            dense,
            selected: selectedItems.includes(item.props.value),
            onChange: handleChange,
            key: `${item.props.value}_${index}`,
          };

          return React.cloneElement(item, childProps);
        },
      )}
    </ToggleButtonGroupLayout>
  );
}
