import styled, { css } from 'styled-components';
import { shadows } from '@sinoui/theme';

export interface DialogWrapperProps {
  /**
   * 是否全屏显示
   */
  fullScreen?: boolean;
  /**
   * 对话框将根据 maxWidth 的值进行自我调整
   */
  fullWidth?: boolean;
  autoWidth?: boolean;
}

/**
 * 全屏模式
 */
const fullScreenStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 0px;
`;

/**
 * 宽屏模式设置的宽度
 */
const fullWidthStyle = css`
  width: 560px;
`;

/**
 * 默认模式最大宽度
 */
const maxWidthStyle = css`
  max-width: ${(props: DialogWrapperProps) =>
    props.autoWidth ? '100%' : '560px'};
`;

/**
 * 默认最大模式尺寸
 */
const defaultBigSizeStyle = css`
  min-width: 300px;
  ${(props: DialogWrapperProps) =>
    props.fullWidth ? fullWidthStyle : maxWidthStyle};
  max-height: 90vh;
  min-height: 100px;
  border-radius: 5px;
`;

/**
 * 包裹整个弹窗的根组件
 */
const DialogWrapper = styled.div<DialogWrapperProps>`
  background: ${(props) => props.theme.palette.background.paper};
  padding: 0;
  box-shadow: ${shadows[24]};
  position: relative;
  z-index: ${(props) => props.theme.zIndex.dialog};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ${(props) => (props.fullScreen ? fullScreenStyle : defaultBigSizeStyle)};
`;

export default DialogWrapper;
