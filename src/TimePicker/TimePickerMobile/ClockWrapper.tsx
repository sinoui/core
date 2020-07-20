import styled from 'styled-components';
import { CLOCK_SIZE } from './constants';

const ClockWrapper = styled.div`
  position: relative;
  width: ${CLOCK_SIZE}px;
  height: ${CLOCK_SIZE}px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.07);
`;

export default ClockWrapper;
