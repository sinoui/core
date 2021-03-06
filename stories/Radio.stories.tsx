import React from 'react';
import Radio from '@sinoui/core/Radio';
import StoryLayout from './StoryLayout';

export default {
  title: 'Radio',
};

export const 基本使用 = () => (
  <StoryLayout>
    <Radio />
    <Radio checked />
  </StoryLayout>
);

export const 带文字单选框 = () => (
  <StoryLayout>
    <Radio
      value="1"
      onChange={(event, checked) => console.log(event.target.value, checked)}
    >
      单选框1
    </Radio>
    <Radio checked>单选框2</Radio>
  </StoryLayout>
);

export const 设置只读 = () => (
  <StoryLayout>
    <p>不可用：</p>
    <Radio disabled>单选框1</Radio>
    <Radio disabled checked>
      单选框2
    </Radio>
    <p>只读：</p>
    <Radio readOnly>单选框1</Radio>
    <Radio readOnly checked>
      单选框2
    </Radio>
  </StoryLayout>
);

export const 指定颜色 = () => (
  <StoryLayout>
    <Radio checked color="primary" />
    <Radio checked color="secondary" />
    <Radio checked color="error" />
    <Radio checked color="warning" />
    <Radio checked color="success" />
    <Radio checked color="info" />
  </StoryLayout>
);
