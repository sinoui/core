import React from 'react';
import styled from 'styled-components';
import { useRipple } from '@sinoui/ripple';

interface Props {
  children: React.ReactNode;
  selected: boolean;
  onChange: () => void;
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
  onChange,
  ...rest
}: Props) {
  const rippleRef = useRipple<HTMLDivElement>();
  return (
    <ClickedTextViewWrapper
      selected={selected}
      onClick={onChange}
      ref={rippleRef}
      {...rest}
    >
      {children}
    </ClickedTextViewWrapper>
  );
}
