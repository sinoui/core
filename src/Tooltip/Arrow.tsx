import styled from 'styled-components';

const Arrow = styled.div`
  z-index: -1;
  position: absolute;
  &::before {
    width: 10px;
    height: 10px;
    position: absolute;
  }
  &::before {
    content: '';
    transform: rotate(45deg);
    background-color: rgb(97, 97, 97);
    top: 0;
    left: 0;
  }
`;

export default Arrow;
