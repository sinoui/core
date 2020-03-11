import styled, { css } from 'styled-components';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';

export interface SwitchTrackProps {
  disabled?: boolean;
  checked?: boolean;
  color?: string;
}

const checkedStyle = css<SwitchTrackProps>`
  background-color: ${({ theme, color = 'primary', disabled }) =>
    disabled ? theme.palette.action.disabled : getColorFromTheme(theme, color)};
  opacity: 0.5;
`;

const disabledStyle = css<SwitchTrackProps>`
  opacity: ${(props) => (props.checked ? 0.5 : 0.12)};
`;

const SwitchTrack = styled.span<SwitchTrackProps>`
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.theme.palette.type === 'light' ? 0.38 : 0.3)};
  z-index: -1;
  transition: ${(props) =>
    props.theme.transitions.create(['opacity', 'background-color'], {
      duration: props.theme.transitions.duration.shortest,
    })};
  border-radius: 7px;
  background-color: ${(props) =>
    props.theme.palette.type === 'light'
      ? props.theme.palette.common.black
      : props.theme.palette.common.white};

  ${(props) => props.checked && checkedStyle};
  ${(props) => props.disabled && disabledStyle};
`;

export default SwitchTrack;
