import React from 'react';
import styled from 'styled-components';

/**
 * 展示简单文本组件的属性
 */
interface SimpleTextProps {
  /**
   * 值
   */
  value?: any | null;
  /**
   * 提示语
   */
  placeholder?: string;
}

const Wrapper = styled.span`
  &.with-placeholder {
    color: ${({ theme }) => theme?.palette.text.hint ?? 'rgba(0, 0, 0, 0.38)'};
  }
`;

/**
 * 展示简单文本组件
 */
const SimpleText = React.forwardRef<HTMLDivElement, SimpleTextProps>(
  function SimpleText({ value, placeholder = <>&nbsp;</> }, ref) {
    const isEmptyValue = value == null || String(value).trim().length === 0;
    return (
      <Wrapper ref={ref} className={isEmptyValue ? 'with-placeholder' : ''}>
        {isEmptyValue ? placeholder : value}
      </Wrapper>
    );
  },
);

export default SimpleText;
