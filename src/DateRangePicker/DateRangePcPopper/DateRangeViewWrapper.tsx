import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

const disabledProps = ['in'];
const DateRangeViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})`
  width: 512px;

  .sinoui-week-title-bar {
    padding: 0 16px 12px;
  }
  .sinoui-date-range-view__datesview {
    margin: 0 16px 8px;
    height: 192px;
    position: relative;
  }
`;

export default DateRangeViewWrapper;
