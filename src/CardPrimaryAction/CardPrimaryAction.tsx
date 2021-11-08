import React from 'react';
import type { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';
import classNames from 'classnames';
import useMultiRefs from '../utils/useMultiRefs';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

const StyledCardPrimaryAction = styled.div`
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
 * CardPrimaryAction 主操作区域
 */
const CardPrimaryAction: React.FC<Props> = React.forwardRef<
  HTMLDivElement,
  Props
>((props, ref) => {
  const { className, tabIndex = 0, ...rest } = props;
  const rippleRef = useRipple<HTMLDivElement>();
  const cardPrimaryActionRef = useMultiRefs(rippleRef, ref);
  return (
    <StyledCardPrimaryAction
      className={classNames('sinoui-card__primary-action', className)}
      tabIndex={tabIndex}
      {...(rest as any)}
      ref={cardPrimaryActionRef}
    />
  );
});

if (process.env.NODE_ENV === 'development') {
  CardPrimaryAction.displayName = 'CardPrimaryAction';
}

export default CardPrimaryAction;
