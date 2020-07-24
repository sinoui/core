import React from 'react';
import styled from 'styled-components';
import { useRipple } from '@sinoui/ripple';

interface Props {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 是否选中
   */
  selected: boolean;
  /**
   * 点击触发的回调函数
   */
  onClick: () => void;
}

/**
 * 具有点击效果的文字显示组件
 */
const ClickedTextViewWrapper = styled.div<{ selected?: boolean }>`
  color: ${(props) => props.theme.palette.primary.contrastText};
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.7)};
  -webkit-tap-highlight-color: transparent;
`;

export default function ClickedTextView({
  children,
  selected,
  onClick,
  ...rest
}: Props) {
  const rippleRef = useRipple<HTMLDivElement>();
  return (
    <ClickedTextViewWrapper
      selected={selected}
      onClick={onClick}
      ref={rippleRef}
      {...rest}
    >
      {children}
    </ClickedTextViewWrapper>
  );
}
