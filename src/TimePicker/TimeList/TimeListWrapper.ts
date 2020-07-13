import styled from 'styled-components';
import { TIME_ITEM_WIDTH } from '../constants';

const TimeListWrapper = styled.div`
  width: ${TIME_ITEM_WIDTH - 1}px;
  overflow: hidden;
  outline: none;
`;

export default TimeListWrapper;
