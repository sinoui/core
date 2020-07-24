import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

const disabledProps = ['in'];
const DateTimeMobileViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})<any>`
  width: 328px;

  .sinoui-week-title-bar {
    padding: 0 12px;
  }

  .sinoui-date-time-mobile-view__datesview {
    padding: 0 12px;
    height: 240px;
  }
`;

export default DateTimeMobileViewWrapper;
