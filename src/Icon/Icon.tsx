import styled from 'styled-components';
import SimpleIcon from './SimpleIcon';
import { colorCss } from '../utils/colors';
import { ColorProp } from '../types';

export interface Props {
  color?: ColorProp;
  disabled?: boolean;
}

const Icon = styled(SimpleIcon).attrs(({ color }) => ({
  color: color || 'currentColor',
}))<Props>`
  ${colorCss};
`;

Icon.sinouiName = 'Icon';
Icon.displayName = 'Icon';

export default Icon;
