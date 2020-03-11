import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

/**
 * ListItemText 列表项中的文本
 */

export interface ListItemProps {
  /**
   * 设置为true 表示密集模式
   */
  dense?: boolean;
  /**
   * 子标题或辅助性问文本
   */
  secondary?: React.ReactNode;
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Wrapper = styled.div.attrs((props: ListItemProps) => ({
  className: classNames('sinoui-list-item-text', {
    'sinoui-list-item-text--dense': props.dense,
  }),
}))`
  min-height: 48px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Title = styled.div((props) => {
  return {
    ...props.theme.typography.h6,
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  };
});
const SecondaryTitle = styled.div((props) => {
  return {
    ...props.theme.typography.subtitle1,
    color: props.theme.palette.text.secondary,
  };
});

export default function ListItemText(props: ListItemProps) {
  const { children, secondary, ...rest } = props;
  return (
    <Wrapper {...rest}>
      <Title>{children}</Title>
      {secondary && <SecondaryTitle>{secondary}</SecondaryTitle>}
    </Wrapper>
  );
}
