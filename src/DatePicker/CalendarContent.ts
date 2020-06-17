import styled, { css } from 'styled-components';
import { CALENDAR_WIDTH_PC, CALENDAR_CONTENT_HEIGHT_PC } from './constants';

const mobileStyle = css`
  height: 280px;
  width: 320px;
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

  ${({ $isPc }) => ($isPc ? pcStyle : mobileStyle)}
`;

export default CalendarContent;
