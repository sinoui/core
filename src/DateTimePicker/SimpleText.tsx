import React from 'react';
import styled from 'styled-components';

interface SimpleTextProps {
  value?: any | null;
  placeholder?: string;
}

const Wrapper = styled.span`
  &.with-placeholder {
    color: ${({ theme }) => theme?.palette.text.hint ?? 'rgba(0, 0, 0, 0.38)'};
  }
`;

const SimpleText = React.forwardRef<HTMLDivElement, SimpleTextProps>(
  ({ value, placeholder }, ref) => {
    const isEmptyValue = value == null || String(value).trim().length === 0;
    return (
      <Wrapper ref={ref} className={isEmptyValue ? 'with-placeholder' : ''}>
        {isEmptyValue ? placeholder : value}
      </Wrapper>
    );
  },
);

export default SimpleText;
