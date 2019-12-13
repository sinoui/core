import React, { ReactType, useCallback } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

export interface BaseInputProps {
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
  inputProps?: React.HTMLProps<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  /**
   * 是否只读，默认为false
   */
  readOnly?: boolean;
  /**
   * 必填
   */
  required?: boolean;
  /**
   * 是否是多行文本
   */
  multiline?: boolean;
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
   * 失去焦点时的回调函数
   */
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /**
   * 值变化时的回调函数
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any,
  ) => void;
  /**
   * 前缀元素
   */
  startComponent?: React.ReactNode;
  /**
   * 后缀元素
   */
  endComponent?: React.ReactNode;
  /**
   * 输入区域渲染元素
   */
  inputComponent?: React.ReactType;
  /**
   * 查找input的dom
   */
  ref?: React.RefObject<HTMLInputElement>;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 全宽模式
   */
  fullWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSuffix?: (state: any) => React.ReactNode;
}

const inputStyle = css<{ disabled?: boolean }>`
  border: 0px;
  box-sizing: content-box;
  background: none;
  margin: 0px;
  font-size: ${(props) => props.theme.typography.subheading.fontSize}rem;
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.text.disabled
      : props.theme.palette.input.inputText};
  -webkit-tap-highlight-color: ${(props) =>
    props.theme.palette.background.transparent};
  display: block;
  min-width: 0px;
  width: 100%;
  height: 1.1875rem;
  ::-moz-placeholder,
  ::-webkit-input-placeholder,
  ::-ms-input-placeholder {
    color: ${(props) => props.theme.palette.text.hint};
  }

  ::-ms-clear {
    display: none;
  }

  &:focus {
    outline: 0;
  }

  &:invalid {
    box-shadow: none;
  }
`;

const disabledStyle = css`
  opacity: 1;
`;

const BaseInputLayout = styled.div<{ disabled?: boolean; fullWidth?: boolean }>`
  display: inline-flex;
  position: relative;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.subheading.fontSize}rem;
  box-sizing: border-box;
  align-items: center;
  font-family: ${(props) => props.theme.typography.fontFamily};
  line-height: 1.1875rem;

  ${(props) => props.fullWidth && `width: 100%;`};

  > input {
    padding: 6px 0 7px;
    ${inputStyle};
    ${(props) => props.disabled && disabledStyle};
  }
`;

const StyleTextarea = styled.textarea`
  resize: none;
  padding: 0;
  line-height: 1.375rem;
  overflow: auto;
  ${inputStyle};
  ${(props: { disabled?: boolean }) => props.disabled && disabledStyle};
`;

export default function BaseInput(props: BaseInputProps) {
  const {
    inputProps = {},
    autoComplete,
    autoFocus,
    className,
    multiline,
    inputComponent = 'input',
    startComponent,
    endComponent,
    ref,
    required,
    onChange: onChangeProp,
    onBlur,
    onFocus,
    disabled,
    fullWidth,
    renderSuffix,
    ...other
  } = props;

  /**
   * 值变更时的回调函数
   */
  const onChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      value,
    ) => {
      if (onChangeProp) {
        onChangeProp(event, value);
      }

      if (inputProps.onChange) {
        inputProps.onChange(event);
      }
    },
    [inputProps, onChangeProp],
  );

  /**
   * 失去焦点时的回调函数
   */
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onBlur) {
        onBlur(event);
      }

      if (inputProps.onBlur) {
        inputProps.onBlur(event);
      }
    },
    [inputProps, onBlur],
  );

  /**
   * 获取焦点时的回调函数
   */
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      if (inputProps.onFocus) {
        inputProps.onFocus(event);
      }
    },
    [inputProps, onFocus],
  );

  const InputComonent: ReactType = multiline ? StyleTextarea : inputComponent;
  const inputprops = {
    ...inputProps,
    ...other,
    autoFocus,
    autoComplete,
    multiline,
    disabled,
    ref: inputProps.ref || ref,
    onChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    'aria-required': required,
  };
  return (
    <BaseInputLayout
      className={classNames('sinoui-base-input__layout', className)}
      disabled={disabled}
      fullWidth={fullWidth}
      data-testid="baseInput"
    >
      {startComponent}
      <InputComonent {...inputprops} />
      {endComponent}
      {renderSuffix && renderSuffix({ disabled, required })}
    </BaseInputLayout>
  );
}
