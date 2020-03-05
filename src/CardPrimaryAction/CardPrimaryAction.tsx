import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';

export interface Props {
  children?: React.ReactNode;
  /**
   * 点击事件
   *
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const StyledCardPrimaryAction = styled.div.attrs(() => ({ tabIndex: '0' }))`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &:hover {
    @media (hover: none) {
      background-color: transparent;
    }
  }

  &:hover::before {
    background-color: ${({ theme }) =>
      theme.palette.type === 'light'
        ? opacify(-0.96, '#000')
        : opacify(-0.96, '#fff')};
  }

  &:focus {
    background-color: ${({ theme }) =>
      theme.palette.type === 'light'
        ? opacify(-0.88, '#000')
        : opacify(-0.88, '#fff')};
  }

  &:focus::before {
    background-color: ${({ theme }) =>
      theme.palette.type === 'light'
        ? opacify(-0.88, '#000')
        : opacify(-0.88, '#fff')};
  }
`;

/**
 *
 * CardPrimaryAction 主操作区域
 */
const CardPrimaryAction = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const rippleRef = useRipple<HTMLDivElement>();
    return <StyledCardPrimaryAction {...props} ref={ref || rippleRef} />;
  },
);

export default CardPrimaryAction;
