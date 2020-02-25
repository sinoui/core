import React, { isValidElement } from 'react';

/**
 * 是否是指定的sinoui组件
 *
 * @export
 * @param {*} element
 * @param {string[]} sinouiNames
 * @returns
 */
export default function isSinouiElement(
  element: React.ReactNode | { type: { sinouiName: string } },
  sinouiNames: string[],
) {
  const type =
    isValidElement(element) &&
    (element.type as {
      sinouiName?: string;
    });
  return isValidElement(element) && sinouiNames.indexOf(type.sinouiName) !== -1;
}
