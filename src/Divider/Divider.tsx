import React from 'react';
import styled, { css } from 'styled-components';
import { MIDDLE_MAGRIN, INSET_MARGIN } from './constants';
/**
 * 中间分割线
 */
const middleCss = css`
  margin-left: ${MIDDLE_MAGRIN}px;
  margin-right: ${MIDDLE_MAGRIN}px;
`;

/**
 * 插入分割线
 */
const insetCss = css`
  margin-left: ${INSET_MARGIN}px;
`;

/**
 * 水平分割线
 */
const horizontalCss = css`
  height: 1px;
  flex-shrink: 0;
`;

/**
 *垂直分割线
 */
const vertivalCss = css`
  height: 100%;
  width: 1px;
`;

/**
 * flex 布局下 垂直分割线 的样式
 */
const flexItemCss = css`
  align-self: stretch;
  height: auto;
`;

/**
 * 水平边距
 */
const marginHorizontaCss = css<{ marginHorizontal?: number }>`
  margin-left: ${({ marginHorizontal = MIDDLE_MAGRIN }) => marginHorizontal}px;
  margin-right: ${({ marginHorizontal = MIDDLE_MAGRIN }) => marginHorizontal}px;
`;

/**
 * 垂直边距
 */
const marginVerticalCss = css<{ marginVertical?: number }>`
  margin-top: ${({ marginVertical = 0 }) => marginVertical}px;
  margin-bottom: ${({ marginVertical = 0 }) => marginVertical}px;
`;

/**
 * 上边距
 */
const marginTopCss = css<{ marginTop?: number }>`
  margin-top: ${({ marginTop = 0 }) => marginTop}px;
`;

/**
 * 下边距
 */
const marginBottomCss = css<{ marginBottom?: number }>`
  margin-bottom: ${({ marginBottom = 0 }) => marginBottom}px;
`;

/**
 * 左边距
 */
const marginLeftCss = css<{ marginLeft?: number }>`
  margin-top: ${({ marginLeft = 0 }) => marginLeft}px;
`;

/**
 * 右边距
 */
const marginRightCss = css<{ marginRight?: number }>`
  margin-top: ${({ marginRight = 0 }) => marginRight}px;
`;

export interface Props {
  /**
   * 插入分割线
   */
  inset?: boolean;
  /**
   * 中间分割线
   */
  middle?: boolean;
  /**
   * false 为表示是垂直分割线
   */
  horizontal?: boolean;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  flexItem?: boolean;
  style?: React.CSSProperties;
  as?: React.ReactType;
  className?: string;
}
const StyledDivider = styled.hr<Props>`
  margin: 0;
  border: none;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.divider};
  ${({ horizontal = false }) => (horizontal ? horizontalCss : vertivalCss)}
  ${({ horizontal = false, middle }) => horizontal && middle && middleCss}
  ${({ horizontal = false, inset }) => horizontal && inset && insetCss}
  ${({ horizontal = false, flexItem }) =>
    !horizontal && flexItem && flexItemCss}
  ${({ marginHorizontal }) =>
    marginHorizontal !== undefined && marginHorizontaCss}
  ${({ marginVertical }) => marginVertical !== undefined && marginVerticalCss}
  ${({ marginTop }) => marginTop !== undefined && marginTopCss}
  ${({ marginBottom }) => marginBottom !== undefined && marginBottomCss}
  ${({ marginLeft }) => marginLeft !== undefined && marginLeftCss}
  ${({ marginRight }) => marginRight !== undefined && marginRightCss}
`;

const Divider = React.forwardRef<React.ReactType, Props>((props, ref) => {
  return <StyledDivider {...props} ref={ref} />;
});

export default Divider;
