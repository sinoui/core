/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import useMultiRefs from '../utils/useMultiRefs';
import singleLineTextCss from '../utils/singleLineTextCss';

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
   * 失去焦点时的回调函数
   */
  onBlur?: () => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: () => void;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 值
   */
  value?: string;
  /**
   * 是否是获取焦点状态
   */
  focused?: boolean;
  /**
   * 渲染方式
   */
  renderValue?: React.ReactNode;
}

const SelectInputLayout = styled.div<{
  disabled?: boolean;
  readOnly?: boolean;
  focused?: boolean;
}>`
  user-select: none;
  box-sizing: content-box;
  cursor: ${({ disabled, readOnly }) =>
    disabled || readOnly ? 'inherit' : 'pointer'};
  width: 0;
  ${singleLineTextCss}

  & + .sinoui-input-adornment--end > .sinoui-svg-icon {
    cursor: ${({ disabled, readOnly }) =>
      disabled || readOnly ? 'inherit' : 'pointer'};
    color: ${({ focused, theme }) =>
      focused ? theme.palette.primary.main : 'currentColor'};
  }
`;

/**
 * 处理弹窗选择相关组件input内部渲染元素
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
    onBlur,
    onFocus,
    readOnly,
    value,
    renderValue,
    ...other
  } = props;

  const selectInputRef = useRef<HTMLDivElement>(null);
  const handleRef = useMultiRefs(ref, selectInputRef);

  useEffect(() => {
    if (autoFocus && selectInputRef.current) {
      selectInputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <SelectInputLayout
      className={classNames('sinoui-select-input', className)}
      ref={handleRef}
      tabIndex={disabled ? undefined : 0}
      role="button"
      aria-disabled={disabled ? 'true' : 'false'}
      onBlur={onBlur}
      onFocus={onFocus}
      readOnly={readOnly}
      disabled={disabled}
      {...other}
    >
      {renderValue ?? value}
    </SelectInputLayout>
  );
});
