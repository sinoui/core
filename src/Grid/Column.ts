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

/**
 * 对应断点尺寸是否需要设置flex-grow: 1
 * @param props
 * @param breakpointKey
 */
const isFlexGrow = (
  props: Props,
  breakpointKey: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
): boolean => {
  let breakpointKeyIndex = breakpointKeys.findIndex(
    (item) => item === breakpointKey,
  );
  // 判断对应断点是否设置了栅格
  if (!props[breakpointKey]) {
    //  则递归判断小于断点之前的断点是否设置了栅格 若都没有设置栅格 则flex-grow: 1,否则应用前一个断点的栅格数
    if (breakpointKeyIndex > 0) {
      breakpointKeyIndex -= breakpointKeyIndex;
      isFlexGrow(props, breakpointKeys[breakpointKeyIndex]);
    }

    return !props[breakpointKey];
  }
  return false;
};

const breakpointsCss = css((props: Props & { theme: Theme }) => {
  return breakpointKeys.reduce((result, item) => {
    const mediaResult = result;
    // colNum 为栅格数
    const colNum = props[item];
    const mediaKey = `@media screen and (min-width: ${props.theme.breakpoints[item]}px)`;
    mediaResult[mediaKey] = {
      flexGrow: isFlexGrow(props, item) ? 1 : 0,
    };
    if (colNum && colNum > 0) {
      mediaResult[mediaKey] = {
        ...mediaResult[mediaKey],
        width: `${(Math.min(colNum, 24) / 24) * 100}%`,
        flexBasis: `${(Math.min(colNum, 24) / 24) * 100}%`,
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
  flex: 0 0 auto;
  ${(props) => props.flexContainer && flexCss}
  ${breakpointsCss}
`;

export default Column;
