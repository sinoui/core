import React from 'react';
import styled from 'styled-components';
import Divider from '@sinoui/core/Divider';
import { MdSubject, MdToc } from 'react-icons/md';

const Wrapper = styled.div`
  display: flex;
  font-size: 24px;
  border: 1px solid ${(props) => props.theme.palette.divider};

  & > svg {
    margin: 8px;
  }
`;
export default function Demo(props: {
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
}) {
  return (
    <Wrapper>
      <MdSubject />
      <Divider vertical flexItem {...props} />
      <MdToc />
    </Wrapper>
  );
}
