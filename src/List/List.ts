import styled, { css } from 'styled-components';
import classNames from 'classnames';

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
  padding: 0;
  box-sizing: border-box;

  & > *.sinoui-list-item {
    ${({ paddingLeft }) =>
      paddingLeft !== undefined && `padding-left: ${paddingLeft}px`}
  }

  & > *.sinoui-list-item--insert {
  }

  & > *.sinoui-list-item--disabled-ripple {
  }
`;

const List = styled.ul.attrs((props: Props) => ({
  className: classNames('sinoui-list', {
    'sinoui-list--insert': props.insert,
    'sinoui-list--disabled-ripple': props.disabledRipple,
    'sinoui-list--dense': props.dense,
  }),
}))<Props>`
  ${ListStyle}
`;

export default List;
