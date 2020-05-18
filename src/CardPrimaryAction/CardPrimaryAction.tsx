import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';
import OverriableComponent from '../OverridableComponent';
import useMultiRefs from '../utils/useMultiRefs';

export interface Props {
  /**
   * 点击事件
   *
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const StyledCardPrimaryAction = styled.div.attrs(() => ({ tabIndex: '0' }))`
  overflow: hidden;
  cursor: pointer;
  outline: none;

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
    ::before {
      background-color: ${({ theme }) =>
        theme.palette.type === 'light'
          ? opacify(-0.96, '#000')
          : opacify(-0.96, '#fff')};
    }
    @media (hover: none) {
      ::before {
        background-color: transparent;
      }
    }
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
const CardPrimaryAction: OverriableComponent<Props, 'div'> = React.forwardRef<
  HTMLDivElement,
  Props
>((props, ref) => {
  const rippleRef = useRipple<HTMLDivElement>();
  const cardPrimaryActionRef = useMultiRefs(rippleRef, ref);
  return <StyledCardPrimaryAction {...props} ref={cardPrimaryActionRef} />;
});

export default CardPrimaryAction;
