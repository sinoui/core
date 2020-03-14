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
   * 设置为true，表示是嵌入式列表
   */
  insert?: boolean;
  /**
   * 设置为true,表示禁用 ripple 效果
   */
  disabledRipple?: boolean;
  /**
   * 设置 List 的子元素的左侧内边距
   */
  paddingLeft?: number;
  /**
   * 设置为true,表示为密集模式
   */
  dense?: boolean;
  /**
   * 自定义class名称
   */
  className?: string;
}

const ListStyle = css<Props>`
  list-style: none;
  margin: 0;
  padding: 8px 0;
  box-sizing: border-box;

  &.sinoui-list--insert > .sinoui-list-item {
    padding-left: 32px;
  }

  & > .sinoui-list-item {
    ${({ paddingLeft }) =>
      paddingLeft !== undefined && `padding-left: ${paddingLeft}px`}
  }
`;

const StyledList = styled.ul.attrs((props: Props) => ({
  className: classNames('sinoui-list', {
    'sinoui-list--insert': props.insert,
    'sinoui-list--disabled-ripple': props.disabledRipple,
    'sinoui-list--dense': props.dense,
  }),
}))<Props>`
  ${ListStyle}
`;

// 将nodeList转换为数组
const nodeListToArray = (listRef: HTMLElement | null) => {
  const arr = [];
  const anchors = listRef?.querySelectorAll('.sinoui-list-item') || [];
  anchors.forEach((item: any) => {
    arr.push(item);
  });

  return arr;
};

const List: OverriableComponent<Props, 'ul'> = React.forwardRef<
  HTMLUListElement,
  Props
>((props, ref) => {
  const listRef = React.createRef<HTMLElement>();
  const multiRef = useMultiRefs(listRef, ref);

  useEffect(() => {
    const listItemsLen =
      listRef.current?.querySelectorAll('.sinoui-list-item').length || 0;
    document.onkeydown = function(e) {
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
        (listRef.current?.querySelectorAll('.sinoui-list-item')[
          focusIndex
        ] as HTMLInputElement).focus();
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [listRef]);
  const { children, ...rest } = props;
  const renderChildren = () =>
    React.Children.map(
      children as React.ReactElement<any>,
      (child: React.ReactElement<any>) => {
        return React.cloneElement(React.Children.only(child), {
          insert: child.props.insert || props.insert,
          dense: child.props.dense || props.dense,
          paddingLeft: child.props.paddingLeft || props.paddingLeft,
          disabledRipple: child.props.disabledRipple || props.disabledRipple,
        });
      },
    );

  return (
    <StyledList {...rest} ref={multiRef}>
      {renderChildren()}
    </StyledList>
  );
});

export default List;
