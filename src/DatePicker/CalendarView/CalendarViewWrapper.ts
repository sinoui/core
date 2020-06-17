import styled, { css } from 'styled-components';
import Paper from '@sinoui/core/Paper';

const mobileStyle = css`
  width: 328px;

  .sinoui-week-title-bar {
    padding: 0 12px;
  }

  .sinoui-calendar-view__datesview {
    padding: 0 12px;
    height: 240px;
  }
`;

const pcStyle = css`
  width: 256px;

  .sinoui-week-title-bar {
    padding: 0 16px 12px;
  }
  .sinoui-calendar-view__datesview {
    padding: 0 16px 8px;
    height: 192px;
  }
`;

const disabledProps = ['in'];
const CalendarViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})<any>`
  ${mobileStyle}
  overflow: hidden;
  outline: none;

  ${({ $isPc }) => $isPc && pcStyle}
`;

export default CalendarViewWrapper;
