import styled, { css, keyframes } from 'styled-components';
import classNames from 'classnames';
import type { ProgressPropsType } from './types';

const DivCanvasKeyFrames = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const DivCanvasCss = css`
  animation: ${DivCanvasKeyFrames} 1.7s linear infinite;
`;

const DivCanvas = styled.div.attrs((props) => ({
  className: classNames(
    'sinoui-progress',
    'sinoui-progress--circle',
    props.className,
  ),
}))<ProgressPropsType>`
  display: inline-flex;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  ${DivCanvasCss};
`;

export default DivCanvas;
