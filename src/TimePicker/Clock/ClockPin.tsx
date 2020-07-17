import styled from 'styled-components';
import { CLOCK_PIN_SIZE } from './constants';

const ClockPin = styled.div`
  top: calc((100% - ${CLOCK_PIN_SIZE}px) / 2);
  left: calc((100% - ${CLOCK_PIN_SIZE}px) / 2);
  width: ${CLOCK_PIN_SIZE}px;
  height: ${CLOCK_PIN_SIZE}px;
  position: absolute;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export default ClockPin;
