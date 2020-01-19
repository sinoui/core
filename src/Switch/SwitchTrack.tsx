import styled, { css } from 'styled-components';
import { getColorFromTheme } from '../utils/color';

export interface SwitchTrackProps {
  disabled?: boolean;
  checked?: boolean;
  color?: string;
}

const checkedStyle = css<SwitchTrackProps>`
  background-color: ${(props) =>
    getColorFromTheme({
      color: props.color || 'primary',
      theme: props.theme,
      disabled: props.disabled,
    })};
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
      ? props.theme.palette.black
      : props.theme.palette.white};

  ${(props) => props.checked && checkedStyle};
  ${(props) => props.disabled && disabledStyle};
`;

export default SwitchTrack;
