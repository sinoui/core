import React from 'react';
import styled from 'styled-components';
import Divider from '@sinoui/core/Divider';

const Wrapper = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  background: pink;
`;
export default function Demo() {
  return (
    <Wrapper>
      <div>left</div>
      <Divider flexItem marginVertical={20} />
      <div>right</div>
    </Wrapper>
  );
}
