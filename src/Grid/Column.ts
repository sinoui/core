import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { Theme } from '@sinoui/theme';

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

const breakpointKeys: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];
let mediaResult;
const breakpointsCss = css((props: Props & { theme: Theme }) => {
  return breakpointKeys
    .filter((item) => {
      // colNum 为栅格数
      const colNum = props[item];
      return colNum && colNum > 0;
    })
    .reduce((result, item) => {
      mediaResult = result;
      const colNum = props[item];
      if (colNum && colNum > 0) {
        mediaResult[
          `@media screen and (min-width: ${props.theme.breakpoints[item]}px)`
        ] = {
          '&': {
            width: `${(Math.min(colNum, 24) / 24) * 100}%`,
            flexBasis: `${(Math.min(colNum, 24) / 24) * 100}%`,
          },
        };
      }
      return mediaResult;
    }, {} as any);
});

const Column = styled.div.attrs(() => ({
  className: classNames('sinoui-column'),
}))<Props>`
  display: block;
  box-sizing: border-box;
  flex: 1 0 auto;
  ${(props) => props.flexContainer && flexCss}
  ${breakpointsCss}
`;

export default Column;
