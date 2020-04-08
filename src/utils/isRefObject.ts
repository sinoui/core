import React from 'react';

/**
 * 判断obj 是否为ref类型
 * @param obj
 */

export default function isRefObject<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj?: any | React.RefObject<T>,
): obj is React.RefObject<T> {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    Object.prototype.hasOwnProperty.call(obj, 'current')
  );
}
