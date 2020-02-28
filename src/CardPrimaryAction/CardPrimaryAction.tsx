import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';

export interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  as?: React.ReactType;
}
const StyledCardPrimaryAction = styled.div`
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
    return (
      <StyledCardPrimaryAction tabIndex="0" {...props} ref={ref || rippleRef}>
        {props.children}
      </StyledCardPrimaryAction>
    );
  },
);

export default CardPrimaryAction;
