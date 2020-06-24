import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

const disabledProps = ['in'];
const MobileDateRangeViewWrapper = styled(Paper).withConfig({
  shouldForwardProp: (prop) => !disabledProps.includes(prop),
})`
  width: 328px;

  .sinoui-week-title-bar {
    padding: 0 12px;
  }
`;

export default MobileDateRangeViewWrapper;
