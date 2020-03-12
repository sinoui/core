import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';
import OverriableComponent from '../OverridableComponent';
import useMultiRefs from '../utils/useMultiRefs';

/**
 * ListItem  列表项组件
 */

export interface ListItemProps {
  /**
   * 设置为true，表示是嵌入样式
   */
  insert?: boolean;
  /**
   * 设置为true,表示禁用 ripple 效果
   */
  disabledRipple?: boolean;
  /**
   * 左侧内边距
   */
  paddingLeft?: number;
  /**
   * 设置为true,表示为密集模式
   */
  dense?: boolean;
  /**
   * 若设置为true，则为不可用状态，不可访问
   */
  disabled?: boolean;
  /**
   * 若设置为true，则为选中状态
   */
  selected?: boolean;
  /**
   * 单击回调函数
   */
  onClick?: (e: React.MouseEvent, value?: any) => void;
  /**
   * 双击回调函数
   */
  onDoubleClick?: (e: React.MouseEvent, value?: any) => void;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 选中样式
 */
const selectedCss = css<ListItemProps>`
  background-color: ${opacify(-0.92, '#6200EE')};
`;

const focusCss = css<ListItemProps>`
  &:focus::before {
    background-color: ${(props) =>
      props.theme.palette.type === 'light'
        ? opacify(-0.88, '#000')
        : opacify(-0.88, '#fff')};
  }
`;

const hoverCss = css<ListItemProps>`
  &:hover {
    @media (hover: none) {
      background-color: transparent;
    }
  }

  &:hover::before {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

const disabledCss = css`
  background-color: ${({ theme }) => theme.palette.action.disabled};
  color: ${({ theme }) => theme.palette.text.disabled};
  cursor: default;
  pointer-events: none;
`;

const ListItemStyle = css<ListItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 16px;
  min-height: 48px;
  background-color: ${(props) => props.theme.palette.background.paper};
  outline: none;
  cursor: pointer;
  ${(props) => props.selected && selectedCss};
  ${(props) => !props.disabled && hoverCss};
  ${(props) => !props.disabled && focusCss};
  ${(props) => props.disabled && disabledCss};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &.sinoui-list-item {
    ${({ paddingLeft }) =>
      paddingLeft !== undefined && `padding-left: ${paddingLeft}px`}
  }

  &.sinoui-list-item--insert {
    padding-left: 32px;
  }
`;

const Wrapper = styled.li.attrs((props: ListItemProps) => ({
  tabIndex: '0',
  className: classNames('sinoui-list-item', {
    'sinoui-list-item--insert': props.insert,
    'sinoui-list-item--disabled-ripple': props.disabledRipple,
    'sinoui-list-item--dense': props.dense,
  }),
}))<ListItemProps>`
  ${ListItemStyle}
`;

const ListItem: OverriableComponent<ListItemProps, 'li'> = React.forwardRef<
  HTMLLIElement,
  ListItemProps
>((props, ref) => {
  const { disabledRipple, disabled } = props;
  const rippleRef = useRipple<HTMLLIElement>();
  const listItemRef = useMultiRefs(rippleRef, ref);
  return (
    <Wrapper {...props} ref={disabledRipple || disabled ? ref : listItemRef} />
  );
});
export default ListItem;
