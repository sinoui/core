import styled from 'styled-components';
import IconButton from '../IconButton';

export interface ToggleButtonProps {
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

const ToggleButton = styled(IconButton).attrs(
  ({ color, checked, disabled }: ToggleButtonProps) => ({
    type: 'switch',
    color: !checked && !disabled ? undefined : color,
  }),
)<ToggleButtonProps>`
  ${(props) =>
    !props.checked &&
    !props.disabled &&
    `color: ${props.theme.palette.text.secondary};`};
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
