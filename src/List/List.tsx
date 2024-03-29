import React, { useRef, useCallback, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import useMultiRefs from '../utils/useMultiRefs';

/**
 * List  列表根组件
 */

export interface Props extends HTMLAttributes<HTMLUListElement> {
  /**
   * 设置为true,表示为密集模式
   */
  dense?: boolean;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 禁用内边距
   */
  disabledPadding?: boolean;
  ref?: React.Ref<HTMLUListElement>;
}

const ListStyle = css<Props>`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: ${(props) => (props.disabledPadding ? 0 : '8px 0')};
  box-sizing: border-box;
`;

const StyledList = styled.ul.attrs((props: Props) => ({
  className: classNames('sinoui-list', {
    'sinoui-list--dense': props.dense,
  }),
}))<Props>`
  ${ListStyle}
`;

// 将nodeList转换为数组
const nodeListToArray = (listRef: HTMLElement | null) => {
  const arr: any[] = [];
  const anchors =
    (listRef && listRef.querySelectorAll('.sinoui-list-item')) || [];
  anchors.forEach((item: any) => {
    arr.push(item);
  });

  return arr;
};

/**
 * 列表组件
 */
const List: React.FC<Props> = React.forwardRef<HTMLUListElement, Props>(
  (props, ref) => {
    const listRef = useRef<HTMLUListElement | null>(null);
    const multiRef = useMultiRefs(listRef, ref);

    /**
     * 获取 需要聚焦的 listItem 序号
     */
    const getFoucsIndex = useCallback(
      (activeIndex: number, isPageDown?: boolean): number => {
        let focusIndex = activeIndex;
        const listItems =
          (listRef.current &&
            listRef.current.querySelectorAll('.sinoui-list-item')) ||
          [];
        if (!isPageDown) {
          focusIndex = focusIndex > 0 ? focusIndex - 1 : 0;
        } else {
          focusIndex =
            focusIndex < listItems.length - 1
              ? focusIndex + 1
              : listItems.length - 1;
        }

        const isItemDisabled =
          listRef.current &&
          listRef.current
            .querySelectorAll('.sinoui-list-item')
            [focusIndex].classList.contains('sinoui-list-item--disabled');
        if (isItemDisabled) {
          // 如果聚焦的元素是列表的最后一个非禁用项，点击下键，则focusIndex = focusIndex - 1
          return getFoucsIndex(
            focusIndex,
            focusIndex < listItems.length - 1 ? isPageDown : !isPageDown,
          );
        }
        return focusIndex;
      },
      [],
    );

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const listItems =
        (listRef.current &&
          listRef.current.querySelectorAll('.sinoui-list-item')) ||
        [];
      const listItemsLen = listItems.length;

      let focusIndex = -1;
      if (listRef.current) {
        focusIndex = nodeListToArray(listRef.current).findIndex(
          (item) => item === document.activeElement,
        );
      }

      switch (event.keyCode) {
        case 38:
          focusIndex = getFoucsIndex(focusIndex);
          break;
        case 40:
          focusIndex = getFoucsIndex(focusIndex, true);
          break;
        default:
          break;
      }

      if (focusIndex !== -1 && focusIndex <= listItemsLen - 1) {
        (
          listItems &&
          listItems[focusIndex] &&
          (listItems[focusIndex] as HTMLInputElement)
        ).focus();
      }
    };

    return <StyledList {...props} ref={multiRef} onKeyDown={handleKeyDown} />;
  },
);

export default List;
