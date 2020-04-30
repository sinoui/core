import React, { useState } from 'react';
import Checkbox from '@sinoui/core/Checkbox';
import TextInput from '@sinoui/core/TextInput';
import styled from 'styled-components';
import StoryLayout from './StoryLayout';

export default {
  title: 'Checkbox',
};

function StatefulCheckbox() {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onChange={setChecked} />;
}

export const 基本使用 = () => (
  <StoryLayout>
    <Checkbox />
    <Checkbox checked />
    <Checkbox indeterminate />
  </StoryLayout>
);

export const 带有文字复选框 = () => (
  <StoryLayout>
    <Checkbox>爱好1</Checkbox>
    <Checkbox checked>爱好2</Checkbox>
    <Checkbox>爱好3</Checkbox>
  </StoryLayout>
);

export const 带有状态复选框 = () => (
  <StoryLayout>
    <StatefulCheckbox />
  </StoryLayout>
);

export const 设置只读 = () => (
  <StoryLayout>
    <p>不可用：</p>
    <Checkbox disabled />
    <p>只读：</p>
    <Checkbox readOnly />
  </StoryLayout>
);

export const 指定颜色 = () => (
  <StoryLayout>
    <Checkbox checked color="primary" />
    <Checkbox checked color="secondary" />
    <Checkbox checked color="error" />
    <Checkbox checked color="warning" />
    <Checkbox checked color="success" />
    <Checkbox checked color="info" />
    <Checkbox checked color="actionActive" />
    <Checkbox checked color="actionDisabled" />
  </StoryLayout>
);

const Label = styled.span`
  display: inline-block;
  margin-right: 8px;
`;

export const 输入框与复选框组合 = () => (
  <StoryLayout>
    <Checkbox checked color="primary">
      <Label>字数</Label>
      <TextInput dense />
    </Checkbox>
  </StoryLayout>
);
