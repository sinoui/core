import styled from 'styled-components';
import getScrollbarSize from 'dom-helpers/scrollbarSize';

/**
 * 盛放内容的区域
 */
const ScrollContent = styled.div`
  overflow: scroll;
  margin-right: ${() => -getScrollbarSize()}px;
  margin-bottom: ${() => -getScrollbarSize()}px;
  height: calc(100% + ${() => getScrollbarSize()}px);
  width: calc(100% + ${() => getScrollbarSize()}px);
`;

export default ScrollContent;
