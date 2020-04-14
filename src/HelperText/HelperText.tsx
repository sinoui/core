import styled from 'styled-components';
import getColorFromTheme from '../utils/getColorFromTheme';

interface Props {
  /**
   * 设置为 `true`，表示显示的是校验错误信息。
   */
  error?: boolean;
  /**
   * 设置为 `true`，则表示表单控件处于不可用状态。
   */
  disabled?: boolean;
  /**
   * 指定帮助性文本默认的颜色。默认为 `textSecondary`。
   */
  color?: string;
}

const getColor = ({ error, disabled, color = 'textSecondary' }: Props) => {
  if (error) {
    return 'error';
  }

  if (disabled) {
    return 'textDisabled';
  }

  return color;
};

/**
 * 帮助性文本
 */
const HelperText = styled.div<Props>`
  ${({ theme }) => theme.typography.caption}
  color: ${({ theme, ...rest }) => getColorFromTheme(theme, getColor(rest))};
  text-align: left;
`;

export default HelperText;
