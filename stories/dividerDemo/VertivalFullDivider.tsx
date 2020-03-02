import React from 'react';
import styled from 'styled-components';
import Divider from '@sinoui/core/Divider';

const Wrapper = styled.div`
  display: flex;
  height: 100px;
`;
export default function Demo() {
  return (
    <Wrapper>
      <Divider flexItem marginVertical={20} />
    </Wrapper>
  );
}
