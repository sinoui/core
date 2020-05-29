import styled from 'styled-components';

/**
 * 表单控件的帮助条
 */

const HelperLine = styled.div.attrs({
  className: 'sinoui-helper-line' as any,
})<{ hasMarginBottom?: boolean }>`
  display: flex;
  align-items: flex-start;
  min-height: 24px;
  padding: 2px 12px;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  line-height: ${(props) => props.theme.typography.caption.lineHeight};
  ${(props) => props.hasMarginBottom && `margin-bottom: 8px`}
  margin-bottom:8px;
  &:empty {
    margin-bottom: 0;
  }
`;

export default HelperLine;
