import styled from 'styled-components';

interface Props {
  /**
   * 是否支持自适应高度
   */
  $autoHeight?: boolean;
}

const ScrollbarContainner = styled.div<Props>`
  height: ${({ $autoHeight }) => ($autoHeight ? 'auto' : '100%')};
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export default ScrollbarContainner;
