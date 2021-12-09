import React, { useCallback } from 'react';
import styled from 'styled-components';
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
  children: React.ReactNode | any;
  /**
   * 设置紧凑模式
   */
  dense?: boolean;
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
 * 切换按钮组组件
 * @param props ToggleButtonGroupProps
 * @returns
 */
export default function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const { children, color, dense, value, multiple, onChange } = props;

  /**
   * 处理值变更
   */
  const handleChange = useCallback(
    (selectedValue: string) => {
      if (multiple) {
        let newValue: string[] = [...(value as string[])];
        const idx = newValue.indexOf(selectedValue);
        if (idx === -1) {
          newValue.push(selectedValue);
        } else {
          newValue = [...newValue.slice(0, idx), ...newValue.slice(idx + 1)];
        }
        if (onChange) {
          onChange(newValue);
        }
      } else if (onChange) {
        onChange(value === selectedValue ? '' : selectedValue);
      }
    },
    [multiple, onChange, value],
  );

  return (
    <ToggleButtonGroupLayout>
      {React.Children.map(
        children,
        (item: React.ReactElement<ToggleButtonProps>) => {
          if (!React.isValidElement(item)) {
            return null;
          }

          const childProps = {
            color,
            dense,
            selected: multiple
              ? value?.indexOf(item.props.value) !== -1
              : value === item.props.value,
            onChange: handleChange,
          };

          return React.cloneElement(item, childProps);
        },
      )}
    </ToggleButtonGroupLayout>
  );
}
