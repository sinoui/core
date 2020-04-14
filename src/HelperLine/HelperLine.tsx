import styled from 'styled-components';

interface Props {
  /**
   * 表单控件的形态。
   */
  variant?: 'standard' | 'filled' | 'outlined';
}

/**
 * 表单控件的帮助条
 */
const HelperLine = styled.div.attrs({ className: 'sinoui-helper-line' })<Props>`
  display: flex;
  align-items: flex-start;
  min-height: 24px;
  padding: 2px 0;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  line-height: ${(props) => props.theme.typography.caption.lineHeight};
  ${({ variant }) =>
    (variant === 'filled' || variant === 'outlined') &&
    `
    padding-left: 12px;
    padding-right: 12px;
  `}
`;

export default HelperLine;
