import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import OverriableComponent from '../OverridableComponent';
import useMultiRefs from '../utils/useMultiRefs';

/**
 * List  列表根组件
 */

export interface Props {
  /**
   * 设置为true,表示为密集模式
   */
  dense?: boolean;
  /**
   * 自定义class名称
   */
  className?: string;
  style?: React.CSSProperties;
}

const ListStyle = css<Props>`
  list-style: none;
  margin: 0;
  padding: 8px 0;
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
  const arr = [];
  const anchors =
    (listRef && listRef.querySelectorAll('.sinoui-list-item')) || [];
  anchors.forEach((item: any) => {
    arr.push(item);
  });

  return arr;
};

const List: OverriableComponent<Props, 'ul'> = React.forwardRef<
  HTMLUListElement,
  Props
>((props, ref) => {
  const listRef = React.createRef<HTMLUListElement>();
  const multiRef = useMultiRefs(listRef, ref);

  useEffect(() => {
    const listItemsLen =
      (listRef.current &&
        listRef.current.querySelectorAll('.sinoui-list-item').length) ||
      0;
    document.onkeydown = (e) => {
      let focusIndex = nodeListToArray(listRef.current).findIndex(
        (item) => item === document.activeElement,
      );
      if (listItemsLen > 0) {
        switch ((e || window.event).keyCode) {
          case 38:
            focusIndex = focusIndex > 0 ? focusIndex - 1 : 0;
            break;
          case 40:
            focusIndex =
              focusIndex < listItemsLen - 1 ? focusIndex + 1 : listItemsLen - 1;
            break;
          default:
            break;
        }
        const listItems =
          (listRef.current &&
            listRef.current.querySelectorAll('.sinoui-list-item')) ||
          [];
        (
          listItems &&
          listItems[focusIndex] &&
          (listItems[focusIndex] as HTMLInputElement)
        ).focus();
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [listRef]);

  return <StyledList {...props} ref={multiRef} />;
});

export default List;
