import styled, { css } from 'styled-components';
import {
  CALENDAR_WIDTH_MOBILE,
  CALENDAR_CONTENT_HEIGHT_MOBILE,
  CALENDAR_WIDTH_PC,
  CALENDAR_CONTENT_HEIGHT_PC,
} from './constants';

const mobileStyle = css`
  height: ${CALENDAR_CONTENT_HEIGHT_MOBILE}px;
  width: ${CALENDAR_WIDTH_MOBILE}px;
  padding: 0px 24px 8px;
`;

const pcStyle = css`
  height: ${CALENDAR_CONTENT_HEIGHT_PC}px;
  width: ${CALENDAR_WIDTH_PC}px;
  padding: 4px 20px 8px 12px;
`;

/**
 * 日历视图中的内容区域
 */
const CalendarContent = styled.div<{ $isPc?: boolean }>`
  box-sizing: border-box;
${mobileStyle}
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${pcStyle}
  }
  
  ${({ $isPc }) =>
    !$isPc
      ? `
  && {
    ${mobileStyle}
  }`
      : pcStyle}
`;

export default CalendarContent;
