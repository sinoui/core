import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

const CalendarViewWrapper = styled(Paper)`
  width: 328px;

  .sinoui-week-title-bar {
    padding: 0 12px;
  }

  .sinoui-calendar-view__datesview {
    padding: 0 12px 8px;
    height: 240px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 256px;

    .sinoui-week-title-bar {
      padding: 0 16px 12px;
    }
    .sinoui-calendar-view__datesview {
      padding: 0 16px 8px;
      height: 192px;
    }
  }
`;

export default CalendarViewWrapper;
