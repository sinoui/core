import styled, { css } from 'styled-components';
import Paper from '@sinoui/core/Paper';

const pcStyle = css`
  display: inline-flex;

  .sinoui-date-time-view__calendar {
    width: 256px;
  }

  .sinoui-week-title-bar {
    padding: 0 16px 12px;
  }
  .sinoui-date-time-view__datesview {
    padding: 0 16px 8px;
    height: 192px;
  }

  .sinoui-date-time-select__time-list {
    width: 136px;
    display: inline-flex;
    justify-content: space-around;
    padding: 8px 0px;
  }
`;

const disabledProps = ['in'];
const DateTimeViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})<any>`
  ${pcStyle}
`;

export default DateTimeViewWrapper;
