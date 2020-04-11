import styled, { css } from 'styled-components';

export interface HelperTextProps {
  disabeld?: boolean;
  error?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  dense?: boolean;
}

const containedStyle = css`
  margin: 8px 12px 0;
`;

/**
 * 帮助性文本
 */
const HelperText = styled.p<HelperTextProps>`
  color: ${(props) => props.theme.palette.text.secondary};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  text-align: left;
  line-height: 0.75rem;
  min-height: 0.75rem;
  margin: 0;
  margin-top: ${(props) => (props.dense ? 4 : 8)}px;

  ${(props) => props.disabeld && `color:${props.theme.palette.text.disabled}`};
  ${(props) => props.error && `color:${props.theme.palette.error.main}`};
  ${(props) =>
    (props.variant === 'filled' || props.variant === 'outlined') &&
    containedStyle};
`;

export default HelperText;
