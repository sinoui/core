import React, { useState, useMemo } from 'react';
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
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否不可用
   */
  disabled?: boolean;
}

const multipleStyle = css`
  height: auto;
  margin-right: 0px;
`;

const NativeSelectLayout = styled.select<Props>`
  && {
    appearance: none;
    min-width: 160px;
    width: 100%;
    user-select: none;
    margin-right: -30px;
    padding-right: 32px;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

    ${({ multiple }) => multiple && multipleStyle}
  }
`;

export default function NativeSelectInput(props: Props) {
  const { children, onChange, value: valueProp, multiple } = props;

  const defaultValue = useMemo(() => valueProp ?? (multiple ? [] : ''), [
    multiple,
    valueProp,
  ]);

  const [value, setValue] = useState(defaultValue);

  const handleOptionClick = (child: any) => (event: any) => {
    let newValue;

    if (multiple) {
      newValue = Array.isArray(value) ? [...value] : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }

    setValue(newValue);

    if (onChange) {
      event.persist();
      Object.defineProperty(event, 'target', {
        writable: true,
        value: { value: newValue },
      });

      onChange(event);
    }
  };

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return React.cloneElement(child, {
      $key: index,
      selected: Array.isArray(value)
        ? value.indexOf(child.props.value) !== -1
        : value === child.props.value,
      onClick: () => handleOptionClick(child),
    });
  });

  return <NativeSelectLayout {...props}>{items}</NativeSelectLayout>;
}
