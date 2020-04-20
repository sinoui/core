import React from 'react';
import styled, { css } from 'styled-components';

export interface Props {
  value?: string | string[];
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string | string[] | undefined) => void;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 标签
   */
  label?: string;
  variant?: 'filled' | 'standard' | 'outlined';
}

const multipleStyle = css`
  height: auto;
  margin-right: 0px;
`;

const NativeSelectLayout = styled.select<Omit<Props, 'onChange'>>`
  && {
    ${({ theme }) => ({ ...theme.typography.body1 })}
    appearance: none;
    min-width: 160px;
    width: 100%;
    height: 100%;
    user-select: none;
    border: 0px;
    background: transparent;
    margin-right: ${({ variant }) =>
      variant === 'filled' || variant === 'outlined' ? -30 : -32}px;
    padding-right: 32px;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

    ${({ multiple }) => multiple && multipleStyle}
  }
`;

export default function NativeSelectInput(props: Props) {
  const { onChange, value, multiple, children, label, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) {
      return;
    }
    const allOptions = event.target.querySelectorAll('option');
    const selectedOptions: string[] = [];
    allOptions.forEach((optionElement) => {
      if (optionElement.selected) {
        selectedOptions.push(optionElement.value);
      }
    });
    onChange(multiple ? selectedOptions : selectedOptions[0]);
  };

  return (
    <NativeSelectLayout
      {...rest}
      value={value}
      multiple={multiple}
      onChange={handleChange}
    >
      <optgroup label={label}>{children}</optgroup>
    </NativeSelectLayout>
  );
}
