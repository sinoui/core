import styled, { css } from 'styled-components';
import classNames from 'classnames';

/**
 * 列布局
 */

interface Props {
  /**
   * 在小于 600px 宽度屏幕下的宽度尺寸占比,如果只指定 xs，则是所有尺寸下的占比
   */
  xs?: number;
  /**
   * 在[600px, 960px)屏幕下的宽度尺寸占比
   */
  sm?: number;
  /**
   * 在[960px, 1280px)屏幕下的宽度尺寸占比比
   */
  md?: number;
  /**
   * 在[1280px, 1920px)屏幕下的宽度尺寸占比
   */
  lg?: number;
  /**
   * 在 >=1920px 屏幕下的宽度尺寸占比
   */
  xl?: number;
  /**
   * 是否启用 flex 布局
   */
  flexContainer?: boolean;
  /**
   * 主轴上的对齐方式
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between';
  /**
   * 交叉轴上的对齐方式
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  /**
   * 自定义样式名称
   */
  className?: string;
}

/**
 * 启用flex布局样式
 */
const flexCss = css<Props>`
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 auto;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
`;

const flexGrowCss = css`
  flex-grow: 1;
`;

const Column = styled.div.attrs(() => ({
  className: classNames('sinoui-column'),
}))<Props>`
  display: block;
  box-sizing: border-box;
  flex: 0 0  auto;
  ${(props) => props.flexContainer && flexCss}


  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    ${({ xs }) =>
      !xs ? flexGrowCss : `width: ${(Math.min(xs, 24) / 24) * 100}%`};
  }

  @media (min-width: ${(props) =>
    props.theme.breakpoints.sm}px) and (max-width: ${(props) =>
  props.theme.breakpoints.md}px) {
    ${({ sm, xs }) =>
      !sm && !xs
        ? flexGrowCss
        : `width: ${(Math.min(sm || xs, 24) / 24) * 100}%`};
  }

  @media (min-width: ${(props) =>
    props.theme.breakpoints.md}px) and (max-width: ${(props) =>
  props.theme.breakpoints.lg}px) {
    ${({ md, sm, xs }) =>
      !md && !sm && !xs
        ? flexGrowCss
        : `width: ${(Math.min(md || sm || xs, 24) / 24) * 100}%`};
  }

  @media (min-width: ${(props) =>
    props.theme.breakpoints.lg}px) and (max-width: ${(props) =>
  props.theme.breakpoints.xl}px) {
    ${({ lg, md, sm, xs }) =>
      !lg && !md && !sm && !xs
        ? flexGrowCss
        : `width: ${(Math.min(lg || md || sm || xs, 24) / 24) * 100}%`};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.xl}px) {
   
    ${({ xl, lg, md, sm, xs }) =>
      !xl && !lg && !md && !sm && !xs
        ? flexGrowCss
        : `width: ${(Math.min(xl || lg || md || sm || xs) / 24) * 100}%`};
  }
`;

export default Column;
