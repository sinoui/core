import styled from 'styled-components';
import { TIME_LIST_HEIGHT, TIME_ITEM_WIDTH } from '../constants';

const TimeSelectViewWrapper = styled.div`
  display: flex;
  width: ${TIME_ITEM_WIDTH * 2 + 24}px;
  height: ${TIME_LIST_HEIGHT + 16}px;
  justify-content: space-around;
  align-items: center;
`;

export default TimeSelectViewWrapper;
