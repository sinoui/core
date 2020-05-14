import styled from 'styled-components';

export interface ScrimProps {
  /**
   * 设置遮罩层透明度值。默认为`0.32`。
   */
  opacity?: number;
  /**
   * 设置z-index
   */
  zIndex?: number;
}

/**
 * 遮罩层样式组件。
 *
 * 此组件的命名`Scrim`来自`material design`设计规范关于遮罩层的描述中。
 */
const Scrim = styled.div<ScrimProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  background-color: rgba(0, 0, 0, ${({ opacity = 0.32 }) => opacity});
  ${({ zIndex }) =>
    zIndex != null &&
    `
    z-index: ${zIndex};
  `};
`;

export default Scrim;
