import React from 'react';
import styled, { css } from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  /**
   * 边框模式 默认为true
   */
  outlined?: boolean;
  /**
   * 阴影
   */
  elevation?: 0 | 1;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  as?: React.ReactType;
}
const StyledCard = styled.div<CardProps>`
  ${({ theme, elevation = 1, outlined = false }) =>
    outlined
      ? css`
          border: 1px solid ${theme.palette.divider};
        `
      : css`
          box-shadow: ${theme.shadows[elevation]};
        `};

  border-radius: 4px;
`;

/**
 *
 * Card 根组件
 */
const Card: React.SFC<CardProps> = ({ children, as = 'div', ...rest }) => {
  return (
    <StyledCard as={as} {...rest}>
      {children}
    </StyledCard>
  );
};

export default Card;
