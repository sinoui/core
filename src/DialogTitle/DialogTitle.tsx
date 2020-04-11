import styled, { css } from 'styled-components';
import classNames from 'classnames';
import Typography from '@sinoui/core/Typography';

const flexStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

/**
 * 弹窗标题组件
 */
const DialogTitle = styled(Typography).attrs(({ className }) => ({
  type: 'h6',
  className: classNames('sinoui-dialog-title', className),
}))<{ showCloseIcon?: boolean; draggable?: boolean }>`
  margin: 0;
  padding: 16px 24px;
  flex: 0 0 auto;
  cursor: ${(props) => props.draggable && 'move'};
  user-select: none;
  ${(props) => props.showCloseIcon && flexStyle};
`;

export default DialogTitle;
