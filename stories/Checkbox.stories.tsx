import React, { useState, useCallback } from 'react';
import Checkbox from '@sinoui/core/Checkbox';
import StoryLayout from './StoryLayout';

export default {
  title: 'Checkbox',
};

function StatefulCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <>
      <Checkbox checked={checked} onChange={handleChange} />
      <Checkbox />
    </>
  );
}

export const 简单使用 = () => (
  <StoryLayout>
    <Checkbox />
    <Checkbox checked color="success" />
    <Checkbox indeterminate color="success" />
  </StoryLayout>
);

export const 带有文字 = () => (
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
    <Checkbox disabled />
    <Checkbox disabled checked />
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
