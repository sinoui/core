import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled from 'styled-components';
import lineRippleStyle from './lineRippleStyle';

export interface InputProps extends BaseInputProps {
  /**
   * 设置为`true`，则表示输入框处于错误状态。
   */
  error?: boolean;
  /**
   * 设置为`true`，则表示输入框处于聚焦状态。
   */
  focused?: boolean;
  /**
   * 设置为`true`，则表示输入框处于密集模式。
   */
  dense?: boolean;
}

/**
 * 标准文本输入框
 */
const StandardInput: React.SFC<InputProps> = styled(BaseInput).attrs({
  standard: true,
})<{
  error?: boolean;
  warning?: boolean;
  dense?: boolean;
}>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.primary};

  > input {
    ${(props) => props.dense && `padding-top:3px;`}
  }

  label ~ & {
    margin-top: 16px;
  }

  ${lineRippleStyle}
`;

export default StandardInput;