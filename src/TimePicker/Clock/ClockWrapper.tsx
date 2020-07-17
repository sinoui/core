import styled from 'styled-components';

const ClockWrapper = styled.div<{ $size: number }>`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.07);
`;

export default ClockWrapper;
