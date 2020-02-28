import React from 'react';
import styled, { css } from 'styled-components';

export interface CardProps {
  /**
   * 边框模式 默认为true
   */
  outlined?: boolean;
  /**
   * 阴影
   */
  elevation?: 0 | 1;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  as?: React.ReactType;
}

const normalCss = css<{ elevation?: 0 | 1 }>`
  box-shadow: ${({ theme, elevation = 1 }) => theme.shadows[elevation]};
`;
const outlinedCss = css`
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

const StyledCard = styled.div<CardProps>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  ${({ outlined }) => (outlined ? outlinedCss : normalCss)};

  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-sizing: border-box;
  outline: none;
`;

/**
 *
 * Card 根组件
 */
React.forwardRef<React.Ref<HTMLDivElement>, CardProps>((props, ref) => {
  const { children } = props;
  return (
    <StyledCard tabIndex="0" {...props} ref={ref}>
      {children}
    </StyledCard>
  );
});

export default StyledCard;
