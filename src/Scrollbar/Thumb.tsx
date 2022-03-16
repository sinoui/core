import styled, { css } from 'styled-components';

interface Props {
  /**
   * 轨道的形态
   *
   * * horizontal - 水平轨道
   * * vertical - 垂直轨道
   */
  variant: 'horizontal' | 'vertical';
}

const horizontalThumbCss = css`
  height: 100%;
`;

const verticalThumbCss = css`
  width: 100%;
`;

/**
 * 滚动容器中的滚动指示器
 */
const Thumb = styled.div<Props>`
  position: relative;
  display: none;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.2);
  touch-action: none;
  ${({ variant }) =>
    variant === 'horizontal' ? horizontalThumbCss : verticalThumbCss}
`;

export default Thumb;
