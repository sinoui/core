import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

const disabledProps = ['in'];
const MobileDateRangeViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})`
  width: 100%;
  height: 100%;

  .sinoui-week-title-bar {
    padding: 0 12px;
    grid-column-gap: 0;

    p {
      height: 48px;
      width: 48px;
    }
  }

  .sinoui-date-cell-content {
    width: 40px;
    height: 40px;
    margin: 4px;
  }

  .sinoui-dates-view {
    grid-column-gap: 0;
  }

  .sinoui-date-cell-ripple-layout,
  .sinoui-date-cell-ripple {
    height: 40px;
    width: 40px;
  }
`;

export default MobileDateRangeViewWrapper;
