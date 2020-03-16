import styled, { css } from 'styled-components';
import classNames from 'classnames';
import Typography from '@sinoui/core/Typography';

const flexStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
`;

/**
 * 弹窗标题组件
 */
const DialogTitle = styled(Typography).attrs(({ className }) => ({
  type: 'H6',
  className: classNames('sinoui-dialog-title', className),
}))<{ showCloseIcon?: boolean }>`
  margin: 0;
  padding: 24px 24px 20px 24px;
  flex: 0 0 auto;
  user-select: none;
  ${(props) => props.showCloseIcon && flexStyle};
`;

export default DialogTitle;
