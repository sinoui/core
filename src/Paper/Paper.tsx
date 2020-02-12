import styled, { css } from 'styled-components';

export interface PaperProps {
  /**
   * 阴影高度
   *
   * @type {number}
   * @memberof PaperProps
   */
  elevation?: number;
  /**
   * 是否显示圆角
   */
  square?: boolean;
  /**
   * 宽度是否全屏
   */
  fullWidth?: boolean;
}

const paperCss = css<PaperProps>`
  box-shadow: ${(props) =>
    props.elevation && props.theme.shadows[props.elevation]};
  border-radius: ${(props) => (props.square ? '0px' : '2px')};
  background-color: ${(props) => props.theme.palette.background.paper};
`;

/**
 * @ReactComponent
 *
 * Paper页面组件
 */
const Paper = styled.div.attrs<PaperProps>(({ elevation }) => ({
  elevation: elevation || 2,
}))<PaperProps>`
  padding: 0;
  box-sizing: border-box;
  display: ${(props) => (props.fullWidth ? 'block' : 'inline-block')};
  ${paperCss};
`;

export default Paper;
