import React, { useCallback, useRef, useMemo } from 'react';
import classNames from 'classnames';
import AutosizeTextarea from 'react-textarea-autosize';
import useMultiRefs from '../utils/useMultiRefs';
import BaseInputLayout from './BaseInputLayout';
import mergeCallbacks from '../utils/mergeCallbacks';
import bemClassNames from '../utils/bemClassNames';

interface MultilineProps {
  /**
   * 指定多行输入框的最大行数
   */
  maxRows?: number;
  /**
   * 指定多行输入框的最小行数
   */
  minRows?: number;
  /**
   * 指定多行输入框的行数
   */
  rows?: number;
}

export interface BaseInputProps<
  InputComponentType extends React.ElementType = any,
  InputElementType = any,
  ExtendInputProps = {}
> {
  /**
   * 值
   */
  value?: string;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 占位符文字
   */
  placeholder?: string;
  /**
   * 输入框类型
   */
  type?: string;
  /**
   * 输入框属性
   */
  inputProps?: React.ComponentPropsWithRef<InputComponentType> &
    Record<string, any> &
    ExtendInputProps;
  /**
   * 为输入框元素指定 ref
   */
  inputRef?: React.Ref<InputElementType>;
  /**
   * 是否是多行文本输入框。如果设置为`true`，则采用 react-textarea-autosize 渲染出 textarea
   */
  multiline?: boolean;
  /**
   * 是否只读，默认为false
   */
  readOnly?: boolean;
  /**
   * 必填
   */
  required?: boolean;
  /**
   * 自动补全
   */
  autoComplete?: string;
  /**
   * 自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * 自定义样式类名称
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 失去焦点时的回调函数
   */
  onBlur?: (event: React.FocusEvent<InputElementType>) => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: (event: React.FocusEvent<InputElementType>) => void;
  /**
   * 值变化时的回调函数
   */
  onChange?: (event: React.ChangeEvent<InputElementType>) => void;
  /**
   * 点击事件的回调函数
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * 在组件的开头添加装饰器`InputAdornment`。
   */
  startAdornment?: React.ReactNode;
  /**
   * 在组件的末尾添加装饰器`InputAdornment`。
   */
  endAdornment?: React.ReactNode;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 全宽模式
   */
  fullWidth?: boolean;
  /**
   * 指定包含的子元素
   */
  children?: React.ReactNode;
  /**
   * 输入区域渲染元素
   */
  inputComponent?: React.ElementType;
  /**
   * 输入框文本对齐方式。默认为`start`。
   */
  align?: 'start' | 'end';
  /**
   * 引用根元素
   */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * 设置输入框元素的id
   */
  id?: string;
  /**
   * 设置输入框的name
   */
  name?: string;
  /**
   * 最小行数目
   */
  minRows?: number;
  /**
   * 最大行数目
   */
  maxRows?: number;
}

export interface BaseInputComponentType<InputElementType = HTMLInputElement> {
  <C extends React.ElementType>(
    props: {
      inputComponent: C;
    } & BaseInputProps<C, InputElementType>,
  ): JSX.Element | null;
  (
    props: {
      multiline: true;
    } & BaseInputProps<'textarea', HTMLTextAreaElement, MultilineProps>,
  ): JSX.Element | null;
  (props: BaseInputProps<'input', InputElementType>): JSX.Element | null;
}

/**
 * 基础输入框组件
 *
 * `BaseInput` 是一个包含尽量少样式的组件。它是用来简化构建输入框的基础组件。包含了输入框的重置样式和部分状态控制。
 */
const BaseInput: BaseInputComponentType = React.forwardRef<
  HTMLDivElement,
  BaseInputProps
>(function BaseInput(props, ref) {
  const {
    value,
    type,
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    autoComplete,
    autoFocus,
    className,
    multiline,
    inputComponent = 'input',
    startAdornment,
    endAdornment,
    required,
    onChange,
    onBlur,
    onFocus,
    onClick,
    disabled,
    fullWidth,
    children,
    placeholder,
    align,
    id,
    name,
    minRows,
    maxRows,
    ...other
  } = props;

  const inputRef = useRef<any>(null);
  const handleInputRef = useMultiRefs(
    inputRef,
    inputRefProp,
    inputPropsProp.ref as any,
  );

  const {
    onChange: onChangeInputProp,
    onBlur: onBlurInputProp,
    onFocus: onFocusInputProp,
  } = inputPropsProp;

  /**
   * 值变更时的回调函数
   */
  const handleChange = useMemo(
    () => mergeCallbacks(onChange, onChangeInputProp),
    [onChangeInputProp, onChange],
  );

  /**
   * 失去焦点时的回调函数
   */
  const handleBlur = useMemo(() => mergeCallbacks(onBlur, onBlurInputProp), [
    onBlur,
    onBlurInputProp,
  ]);

  /**
   * 获取焦点时的回调函数
   */
  const handleFocus = useMemo(() => mergeCallbacks(onFocus, onFocusInputProp), [
    onFocus,
    onFocusInputProp,
  ]);

  /**
   * 处理点击事件的回调函数xx
   */
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input && event.currentTarget === event.target) {
        input.focus();
      }
      if (onClick) {
        onClick(event);
      }
    },
    [onClick],
  );

  const InputComonent = multiline ? AutosizeTextarea : inputComponent;

  const inputprops: Record<string, any> = {
    ...inputPropsProp,
    value,
    id,
    name,
    type,
    autoFocus,
    autoComplete,
    disabled,
    readOnly: props.readOnly,
    defaultValue: props.defaultValue,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    placeholder,
    'aria-required': required,
  };

  if (multiline) {
    inputprops.inputRef = handleInputRef;
    inputprops.minRows = minRows;
    inputprops.maxRows = maxRows;
  } else {
    inputprops.ref = handleInputRef;
  }

  return (
    <BaseInputLayout
      className={classNames(
        className,
        bemClassNames('sinoui-base-input', {
          disabled,
        }),
      )}
      disabled={disabled}
      $fullWidth={fullWidth}
      $align={align}
      data-testid="baseInput"
      ref={ref}
      onClick={handleClick}
      {...other}
    >
      {startAdornment}
      <InputComonent
        {...inputprops}
        className={classNames(inputprops.className, 'sinoui-base-input__input')}
      />
      {endAdornment}
      {children}
    </BaseInputLayout>
  );
});

export default BaseInput;
