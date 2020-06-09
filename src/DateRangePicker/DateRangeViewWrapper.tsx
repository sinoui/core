import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

const disabledProps = ['in'];
const DateRangeViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 512px;

    .sinoui-week-title-bar {
      padding: 0 16px 12px;
    }
    .sinoui-date-range-view__datesview {
      padding: 0 16px 8px;
      height: 192px;
    }
  }
`;

export default DateRangeViewWrapper;
