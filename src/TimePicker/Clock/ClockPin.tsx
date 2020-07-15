import styled from 'styled-components';

const ClockPin = styled.div`
  top: calc((100% - 6px) / 2);
  left: calc((100% - 6px) / 2);
  width: 6px;
  height: 6px;
  position: absolute;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export default ClockPin;
