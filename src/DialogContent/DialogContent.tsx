import DialogTitle from '@sinoui/core/DialogTitle';
import Typography from '@sinoui/core/Typography';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import classNames from 'classnames';
import styled from 'styled-components';

const DialogContent = styled(Typography).attrs(({ className }) => ({
  type: 'subtitle1',
  className: classNames('sinoui-dialog-content', className),
  color: 'textSecondary',
}))`
  padding: 24px 24px 24px 24px;
  color: ${(props) => getColorFromTheme(props.theme, props.color)};
  overflow-y: auto;
  flex: 1 1 auto;
  ${DialogTitle} ~ & {
    padding-top: 0;
  }
`;

export default DialogContent;
