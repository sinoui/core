/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import useMultiRefs from '../utils/useMultiRefs';
import singleLineTextCss from '../utils/singleLineTextCss';
import type SelectItem from './SelectItem';
import SelectValueDisplay from './SelectValueDisplay';

export interface Props {
  /**
   * 是否自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 不可用
   */
  disabled?: boolean;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 失去焦点时的回调函数
   */
  onBlur?: () => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string | string[]) => void;
  /**
   * 弹窗出现时的回调函数
   */
  onOpen?: () => void;
  /**
   * 弹窗关闭时的回调函数
   */
  onClose?: () => void;
  /**
   * 是否显示弹窗
   */
  open: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 渲染值的处理逻辑
   */
  renderValue?: (
    value: string | string[] | undefined,
    items: SelectItem[],
  ) => React.ReactNode;
  /**
   * tab键顺序值
   */
  tabIndex?: number;
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 菜单的最小宽度
   */
  menuMinWidth?: number;
  selectRef?: HTMLDivElement;
}

const SelectInputLayout = styled.div`
  user-select: none;
  box-sizing: content-box;
  cursor: inherit;
  ${singleLineTextCss}
`;

/**
 * 从 children 中解析出选项
 *
 * @param children 下拉框叶子节点
 */
function parseItemsFromChildren(children: React.ReactNode): SelectItem[] {
  return (
    React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return {
        id: `${index}`,
        value: child.props.value,
        children: child.props.children as React.ReactNode,
      };
    })?.filter(Boolean) || []
  );
}

/**
 * 处理复选框内部逻辑的组件
 */
export default React.forwardRef<HTMLDivElement, Props>(function SelectInput(
  props,
  ref,
) {
  const {
    autoFocus,
    children,
    className,
    disabled,
    multiple,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open,
    readOnly,
    renderValue = (value, items) => (
      <SelectValueDisplay value={value} items={items} />
    ),
    tabIndex = 0,
    value,
    menuMinWidth,
    selectRef,
    ...other
  } = props;

  const items = parseItemsFromChildren(children);

  const selectInputRef = useRef<HTMLDivElement>(null);
  const handleRef = useMultiRefs(ref, selectInputRef);

  useEffect(() => {
    if (autoFocus && selectInputRef.current) {
      selectInputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (onOpen && !readOnly) {
      const validKeys = [' ', 'ArrowUp', 'ArrowDown', 'Enter'];

      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        onOpen();
      }
    }
  };

  const handleBlur = () => {
    if (open) {
      return;
    }

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <SelectInputLayout
      className={classNames('sinoui-select-input', className)}
      ref={handleRef}
      tabIndex={disabled ? undefined : tabIndex}
      role="button"
      aria-expanded={open ? 'true' : 'false'}
      aria-haspopup="listbox"
      aria-disabled={disabled ? 'true' : 'false'}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={onFocus}
      {...other}
    >
      {renderValue(value, items)}
    </SelectInputLayout>
  );
});
