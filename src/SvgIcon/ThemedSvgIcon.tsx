import styled from 'styled-components';
import { getColorFromTheme } from '../utils/colors';
import { ColorProp } from '../types';
import SvgIcon from './SvgIcon';

export interface Props {
  color?: ColorProp;
}

const ThemedSvgIcon = styled(SvgIcon) <Props>`
  ${(props) =>
    props.color !== 'none' && `color: ${getColorFromTheme(props, 'primary')}`};
`;

ThemedSvgIcon.sinouiName = 'SvgIcon';
ThemedSvgIcon.displayName = 'SvgIcon';

export default ThemedSvgIcon;
