import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { MIDDLE_MAGRIN, INSET_MARGIN } from './constants';

export interface Props {
  /**
   * 水平插入分割线
   */
  inset?: boolean;
  /**
   * 水平中间分割线
   */
  middle?: boolean;
  /**
   * true 为表示是垂直分隔线
   */
  vertical?: boolean;
  /**
   * 分隔线左边距
   */
  marginLeft?: number;
  /**
   * 分隔线右边距
   */
  marginRight?: number;
  /**
   * 分隔线上边距
   */
  marginTop?: number;
  /**
   * 分隔线下边距
   */
  marginBottom?: number;
  /**
   * 分隔线垂直边距 即上下边距
   */
  marginVertical?: number;
  /**
   * 分隔线水平边距 即左右边距
   */
  marginHorizontal?: number;
  /**
   * 是否为flex布局 垂直分隔线需要设置
   */
  flexItem?: boolean;
}

/**
 * 水平分隔线样式
 */
const horizontalCss = css`
  height: 1px;
  flex-shrink: 0;
`;

/**
 * 水垂直分隔线样式
 */
const verticalCss = css`
  height: 100%;
  width: 1px;
`;

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
 * flex 布局下 垂直分割线 的样式
 */
const flexItemCss = css`
  align-self: stretch;
  height: auto;
`;

/**
 * 水平边距
 */
const marginHorizontalCss = css<{ marginHorizontal?: number }>`
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
  margin-left: ${({ marginLeft = 0 }) => marginLeft}px;
`;

/**
 * 右边距
 */
const marginRightCss = css<{ marginRight?: number }>`
  margin-right: ${({ marginRight = 0 }) => marginRight}px;
`;

const DividerClassName = 'sinoui-divider';

/**
 * 分隔线
 */
const StyledDivider = styled.hr.attrs(({ vertical }: Props) => ({
  className: classNames(DividerClassName, {
    [`${DividerClassName}--vertical`]: vertical,
  }),
}))<Props>`
  margin: 0;
  border: none;
  box-sizing: border-box;
  flex: 0 0 1px;
  background-color: ${({ theme }) => theme.palette.divider};
  ${({ vertical }) => (vertical ? verticalCss : horizontalCss)}
  ${({ vertical, middle }) => !vertical && middle && middleCss}
  ${({ vertical, inset }) => !vertical && inset && insetCss}
  ${({ vertical, flexItem }) => vertical && flexItem && flexItemCss}
  ${({ marginHorizontal }) =>
    marginHorizontal !== undefined && marginHorizontalCss}
  ${({ marginVertical }) => marginVertical && marginVerticalCss}
  ${({ marginTop }) => marginTop && marginTopCss}
  ${({ marginBottom }) => marginBottom && marginBottomCss}
  ${({ marginLeft }) => marginLeft !== undefined && marginLeftCss}
  ${({ marginRight }) => marginRight !== undefined && marginRightCss}
`;

export default StyledDivider;
