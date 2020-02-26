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
    background-color: ${opacify(-0.96, '#000')};
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    @media (hover: none) {
      background-color: transparent;
    }
  }

  &:focus {
    background-color: ${opacify(-0.88, '#000')};
    outline: none;
  }
`;

/**
 *
 * CardPrimaryAction 主操作区域
 */
const CardPrimaryAction: React.SFC<Props> = ({
  children,
  as = 'div',
  ...rest
}) => {
  const ref = useRipple<HTMLDivElement>();
  return (
    <StyledCardPrimaryAction as={as} {...rest} ref={ref}>
      {children}
    </StyledCardPrimaryAction>
  );
};

export default CardPrimaryAction;
