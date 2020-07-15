import styled from 'styled-components';
import type { Theme } from '@sinoui/theme';
import Body2 from '@sinoui/core/Body2';
import adjustOpacity from '../../utils/adjustOpacity';
import { TIME_ITEM_WIDTH, TIME_ITEM_HEIGHT } from '../constants';

interface Props {
  selected?: boolean;
}

const getBackgroundColor = (props: Props & { theme: Theme }) => {
  const { selected, theme } = props;

  return selected ? theme.palette.primary.main : null;
};

const getTextColor = (props: Props & { theme: Theme }) => {
  const bgColor = getBackgroundColor(props);

  return bgColor ? props.theme.palette.getContrastText(bgColor) : null;
};

/**
 * 时间选项容器
 */
const TimeItemWrapper = styled(Body2)<Props>`
  width: ${TIME_ITEM_WIDTH}px;
  height: ${TIME_ITEM_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${getBackgroundColor};
  color: ${getTextColor};
  outline: none;
  user-select: none;

  &:hover {
    background-color: ${(props) =>
      !getBackgroundColor(props)
        ? adjustOpacity(0.04, props.theme.palette.text.primary)
        : null};
  }
`;

export default TimeItemWrapper;
