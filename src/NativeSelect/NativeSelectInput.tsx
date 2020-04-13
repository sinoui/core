import React from 'react';
import styled, { css } from 'styled-components';

const selectStyle = css`
  min-width: ${(props) => props.minWidth || 160}px;
  user-select: none;
  padding: 6px 0 7px;
  height: 1.1875rem;
  width: 100%;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
  border: 0px;
  box-sizing: content-box;
  background: transparent;
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize}rem;
  font-family: ${(props) => props.theme.typography.fontFamily};
  border-radius: 0;
  outline: none;
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  &::-ms-expand {
    display: none;
  }
`;

const NativeSelectLayout = styled.select`
  appearance: none;
  ${selectStyle}
`;

export default function NativeSelectInput(props) {
  const { children, onChange } = props;
  return (
    <NativeSelectLayout onChange={onChange} {...props}>
      {children}
    </NativeSelectLayout>
  );
}
