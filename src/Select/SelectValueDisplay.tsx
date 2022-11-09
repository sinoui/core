/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import type SelectItem from './SelectItem';
/**
 * 判断是否为空
 *
 * @param {*} display 判断的值
 * @returns boolean
 */
function isEmpty(display?: string | string[]) {
  return (
    display == null ||
    display.length === 0 ||
    (typeof display === 'string' && !display.trim())
  );
}

const Placeholder = styled.span`
  color: ${({ theme }) => theme.palette.text.hint};
`;

/**
 * 展现选择框选中值的组件
 *
 * @param root0
 * @param root0.value
 * @param root0.items
 * @param root0.placeholder
 */
function SelectValueDisplay({
  value,
  items,
  placeholder,
}: {
  /**
   *
   */
  value: string | string[] | undefined;
  /**
   *
   */
  items: SelectItem[];
  /**
   *
   */
  placeholder: string | undefined;
}) {
  if (isEmpty(value)) {
    return placeholder ? (
      <Placeholder>{placeholder}</Placeholder>
    ) : (
      <span>&#8203;</span>
    );
  }
  const values = Array.isArray(value) ? value : [value];
  const result = values.map((itemValue, index) => {
    const item = items.find((_) => _.value === itemValue);
    if (!item) {
      return null;
    }
    const { title, children } = item;
    const selectValue = title ?? children;
    if (typeof selectValue === 'string') {
      return (
        <React.Fragment key={index}>
          {selectValue}
          {index === values.length - 1 ? '' : ', '}
        </React.Fragment>
      );
    }
    return <React.Fragment key={index}>{selectValue}</React.Fragment>;
  });

  return <>{result}</>;
}

export default SelectValueDisplay;
