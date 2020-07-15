import styled from 'styled-components';
import IconButton from '@sinoui/core/IconButton';

const SmallIconButton = styled(IconButton)`
  width: 24px;
  height: 24px;

  > .sinoui-svg-icon {
    font-size: 20px;
  }

  > .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
  }

  > .sinoui-icon-button__ripple-layout > .sinoui-icon-button__ripple {
    width: 24px;
    height: 24px;
  }
`;

export default SmallIconButton;
