import styled, { css } from 'styled-components';
import getScrollbarSize from 'dom-helpers/scrollbarSize';

interface Props {
  /**
   * 是否支持自适应高度
   */
  $autoHeight?: boolean;
}

const defaultContentStyle = css`
  position: absolute;
  inset: 0px;
`;

const autoHeightContentStyle = css`
  position: relative;
`;

/**
 * 盛放内容的区域
 */
const ScrollContent = styled.div<Props>`
  overflow: scroll;
  margin-right: ${() => -getScrollbarSize()}px;
  margin-bottom: ${() => -getScrollbarSize()}px;
  height: calc(100% + ${() => getScrollbarSize()}px);
  width: calc(100% + ${() => getScrollbarSize()}px);
  ${({ $autoHeight }) =>
    $autoHeight ? autoHeightContentStyle : defaultContentStyle}
`;

export default ScrollContent;
