import React from 'react';
import Radio from '@sinoui/core/Radio';
import StoryLayout from './StoryLayout';

export default {
  title: 'Radio',
};

export const 基本单选框 = () => (
  <StoryLayout>
    <Radio></Radio>
    <Radio checked></Radio>
  </StoryLayout>
);

export const 带文字 = () => (
  <StoryLayout>
    <Radio
      value="1"
      onChange={(event, checked) => console.log(event.target.value, checked)}
      onClick={() => console.log('1')}
    >
      单选框1
    </Radio>
    <Radio checked>单选框2</Radio>
  </StoryLayout>
);

export const 只读 = () => (
  <StoryLayout>
    <Radio disabled>单选框1</Radio>
    <Radio readOnly>单选框2</Radio>
  </StoryLayout>
);

export const 指定颜色 = () => (
  <StoryLayout>
    <Radio checked color="primary" />
    <Radio checked color="secondary" />
    <Radio checked color="error" />
    <Radio checked color="warning" warning>
      单选框
    </Radio>
    <Radio checked color="success" />
    <Radio checked color="info" />
  </StoryLayout>
);
