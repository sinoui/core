import React from 'react';
import styled from 'styled-components';
import { useRipple } from '@sinoui/ripple';

interface Props {
  children: React.ReactNode;
  selected: boolean;
  /**
   * AM PM切换
   */
  onChange: () => void;
}

const AmPmViewWrapper = styled.div<{ selected?: boolean }>`
  color: ${(props) => props.theme.palette.primary.contrastText};
  opacity: 0.7;
  cursor: pointer;
  ${(props) => props.selected && `opacity: 1`};
`;

export default function AmPmView({ children, selected, onChange }: Props) {
  const rippleRef = useRipple<HTMLDivElement>();
  return (
    <AmPmViewWrapper selected={selected} onClick={onChange} ref={rippleRef}>
      {children}
    </AmPmViewWrapper>
  );
}
