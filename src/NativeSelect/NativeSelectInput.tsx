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
  onChange?: (value: string | string[]) => void;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否不可用
   */
  disabled?: boolean;
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
  const { onChange, value, multiple } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let newValue;

    if (multiple) {
      newValue = Array.isArray(value) ? [...value] : [];
      const itemIndex = (value as string).indexOf(event.target.value);
      if (itemIndex === -1) {
        newValue.push(event.target.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = event.target.value;
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return <NativeSelectLayout {...props} onChange={handleOnChange} />;
}
