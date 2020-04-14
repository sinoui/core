import React from 'react';
import styled, { css } from 'styled-components';
import classnames from 'classnames';
import Paper from '@sinoui/core/Paper';

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
}

const normalCss = css<{ elevation?: 0 | 1 }>`
  box-shadow: ${({ theme, elevation = 1 }) => theme.shadows[elevation]};
`;
const outlinedCss = css`
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

/**
 * Card 根组件
 */
const StyledCard = styled(Paper).attrs(({ outlined }: CardProps) => ({
  tabIndex: '0',
  className: classnames('sinoui-card', {
    'sinoui-card--outlined': outlined,
  }),
}))<CardProps>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  outline: none;
`;

export default StyledCard;
