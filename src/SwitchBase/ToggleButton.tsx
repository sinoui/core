import styled from 'styled-components';
import IconButton from '@sinoui/core/IconButton';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import { Theme } from '@sinoui/theme';

/**
 * 颜色
 */
const colorWrapper = (props: ToggleButtonProps) => {
  let color;
  if (!props.checked && !props.disabled) {
    color = getColorFromTheme(props.theme, 'textSecondary');
  } else if (props.disabled) {
    color = getColorFromTheme(props.theme, 'actionDisabled');
  } else {
    color = getColorFromTheme(props.theme, props.color);
  }
  return color;
};

export interface ToggleButtonProps {
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  theme: Theme;
}

const ToggleButton = styled(IconButton).attrs(() => ({
  type: 'switch',
}))<ToggleButtonProps>`
  color: ${(props) => colorWrapper(props)};
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
