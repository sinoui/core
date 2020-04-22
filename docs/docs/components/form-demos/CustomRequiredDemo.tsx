import styled from 'styled-components';
import React from 'react';
import FormControl from '@sinoui/core/FormControl';
import TextInput from '@sinoui/core/TextInput';

const Wrapper = styled.div`
  width: 100%;
  .sinoui-form-label::before {
    color: red;
  }
`;

export default function CustomRequiredDemo() {
  return (
    <Wrapper>
      <FormControl label="姓名" layout="horizontal" required>
        <TextInput variant="outlined" />
      </FormControl>
      <FormControl label="年龄" layout="horizontal" required>
        <TextInput variant="outlined" />
      </FormControl>
    </Wrapper>
  );
}
