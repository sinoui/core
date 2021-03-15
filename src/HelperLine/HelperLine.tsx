import styled from 'styled-components';

/**
 * 表单控件的帮助条
 */

const HelperLine = styled.div.attrs({
  className: 'sinoui-helper-line' as any,
})`
  display: flex;
  align-items: flex-start;
  min-height: 24px;
  padding: 2px 12px;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  line-height: ${(props) => props.theme.typography.caption.lineHeight};
`;

export default HelperLine;
