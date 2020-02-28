import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';

export interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  as?: any;
}
const StyledCardPrimaryAction = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.type === 'light'
        ? opacify(-0.96, '#000')
        : opacify(-0.96, '#fff')};
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    @media (hover: none) {
      background-color: transparent;
    }
  }

  &:focus {
    background-color: ${({ theme }) =>
      theme.palette.type === 'light'
        ? opacify(-0.88, '#000')
        : opacify(-0.88, '#fff')};
    outline: none;
  }
`;

/**
 *
 * CardPrimaryAction 主操作区域
 */
const CardPrimaryAction: React.SFC<Props> = ({ children, ...rest }) => {
  const ref = useRipple<HTMLDivElement>();
  return (
    <StyledCardPrimaryAction {...rest} ref={ref}>
      {children}
    </StyledCardPrimaryAction>
  );
};

export default CardPrimaryAction;
