import styled from 'styled-components';
import IconButton from '@sinoui/core/IconButton';

export interface ToggleButtonProps {
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

const ToggleButton = styled(IconButton).attrs(() => ({
  type: 'switch',
}))<ToggleButtonProps>`
  ${(props) =>
    !props.checked &&
    !props.disabled &&
    `color: ${props.theme.palette.text.secondary}`};
  color: ${(props) =>
    !props.checked && !props.disabled
      ? props.theme.palette.text.secondary
      : props.color};
  > .sinoui-icon,
  > .sinoui-svg-icon {
    font-size: 20px;
  }
  width: 20px;
  height: 20px;
  > .sinoui-icon-button__ripple-layout-dense {
    left: -6px;
    top: -6px;
  }
  > .sinoui-icon-button__ripple-layout {
    left: -14px;
    top: -14px;
  }
`;

export default ToggleButton;
