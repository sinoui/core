import React, { useState } from 'react';
import Checkbox from '../src/Checkbox';
import CheckboxGroup from '../src/CheckboxGroup';
import type { CheckboxGroupProps } from '../src/CheckboxGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'CheckboxGroup',
};

function CheckboxGroupDemo(props: CheckboxGroupProps<string>) {
  const [value, setValue] = useState<string[] | undefined>(['2', '3']);

  return (
    <CheckboxGroup onChange={setValue} value={value} {...props}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
    </CheckboxGroup>
  );
}

export const 基本使用 = () => (
  <StoryLayout>
    <CheckboxGroupDemo />
  </StoryLayout>
);

export const 设置items属性 = () => (
  <StoryLayout>
    <CheckboxGroupDemo
      items={[
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' },
        { value: '4', label: '选项4' },
      ]}
    />
  </StoryLayout>
);

export const 设置是否支持全选 = () => (
  <StoryLayout>
    <CheckboxGroupDemo enableSelectAll />
  </StoryLayout>
);

export const 设置不可用 = () => (
  <StoryLayout>
    <p>不可用:</p>
    <CheckboxGroup disabled value={['2']}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
    <p>只读:</p>
    <CheckboxGroup readOnly value={['2']}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置是否纵向显示 = () => (
  <StoryLayout>
    <CheckboxGroupDemo column />
  </StoryLayout>
);

export const 设置标题显示位置 = () => (
  <StoryLayout>
    <p>标题显示在右侧：</p>
    <CheckboxGroupDemo />
    <p>标题显示在左侧：</p>
    <CheckboxGroupDemo labelPosition="left" />
  </StoryLayout>
);

export const 设置网格对齐布局默认3列 = () => (
  <StoryLayout>
    <p>设置columns为3：</p>
    <CheckboxGroupDemo columns={3} />
    <p>设置colums为4：</p>
    <CheckboxGroupDemo columns={4} />
  </StoryLayout>
);
