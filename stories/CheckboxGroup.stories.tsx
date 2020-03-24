import React, { useState } from 'react';
import Checkbox from '../src/Checkbox';
import CheckboxGroup from '../src/CheckboxGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'CheckboxGroup',
};

function CheckboxGroupDemo(props: any) {
  const [value, setValue] = useState(['2', '3']);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    setValue(event.target.value);
  };
  console.log(value);
  return (
    <CheckboxGroup onChange={onChange} value={value} {...props}>
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
export const 非受控使用 = () => (
  <StoryLayout>
    <CheckboxGroup onChange={(value) => console.log(value)}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置items属性 = () => (
  <StoryLayout>
    <CheckboxGroupDemo
      items={[
        <Checkbox value="1">复选框1</Checkbox>,
        <Checkbox value="2">复选框2</Checkbox>,
        <Checkbox value="3">复选框3</Checkbox>,
        <Checkbox value="4">复选框4</Checkbox>,
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
    <p>默认：</p>
    <CheckboxGroupDemo gridLayout />
    <p>设置colums为4：</p>
    <CheckboxGroupDemo gridLayout columns={4} />
  </StoryLayout>
);
