/* eslint-disable react/no-array-index-key */
import React from 'react';
import SelectItem from './SelectItem';
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

/**
 * 展现选择框选中值的组件
 */
function SelectValueDisplay({
  value,
  items,
}: {
  value?: string | string[];
  items: SelectItem[];
}) {
  if (isEmpty(value)) {
    return <span>&#8203;</span>;
  }
  const values = Array.isArray(value) ? value : [value];
  const result = values.map((itemValue, index) => {
    const item = items.find((_) => _.value === itemValue);
    if (!item) {
      return null;
    }
    const { children } = item;
    if (typeof children === 'string') {
      return (
        <React.Fragment key={index}>
          {children}
          {index === values.length - 1 ? '' : ', '}
        </React.Fragment>
      );
    }
    return <React.Fragment key={index}>{children}</React.Fragment>;
  });

  return <>{result}</>;
}

export default SelectValueDisplay;
