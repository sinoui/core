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

const horizontalTrackCss = css`
  height: 6px;
  right: 2px;
  bottom: 2px;
  left: 2px;
`;

const verticalTrackCss = css`
  width: 6px;
  right: 2px;
  bottom: 2px;
  top: 2px;
`;

/**
 * 盛放滚动指示器的滚动轨道
 */
const Track = styled.div<Props>`
  position: absolute;
  border-radius: 3px;
  user-select: none;
  ${({ variant }) =>
    variant === 'horizontal' ? horizontalTrackCss : verticalTrackCss}
`;

export default Track;
