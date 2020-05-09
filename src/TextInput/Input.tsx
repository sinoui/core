import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import lineRippleStyle from './lineRippleStyle';

export interface InputProps extends BaseInputProps {
  /**
   * 设置为`true`，则表示输入框处于聚焦状态。
   */
  focused?: boolean;
  /**
   * 设置为`true`，则表示输入框处于密集模式。
   */
  dense?: boolean;
  /**
   * 无标签
   */
  noLabel?: boolean;
}

const noLabelStyle = css`
  padding: 7.5px 0 8.5px;
`;

const denseNoLabelStyle = css`
  padding: 3.5px 0px 4.5px;
`;

/**
 * 标准文本输入框
 */
const StandardInput: React.SFC<InputProps> = styled(BaseInput)<InputProps>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.primary};

  label ~ & {
    margin-top: 16px;
  }

  .sinoui-form-item--floating > .sinoui-form-item__content & {
    margin-top: 16px;
  }

  ${({ multiline }) => (multiline ? '&' : '> .sinoui-base-input__input')} {
    padding: 3.5px 0px 4.5px;
    ${({ noLabel }) => noLabel && noLabelStyle}
    ${({ noLabel, dense }) => dense && noLabel && denseNoLabelStyle}
  }

  ${lineRippleStyle}
`;

export default StandardInput;
