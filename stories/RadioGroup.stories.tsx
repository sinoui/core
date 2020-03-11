import React from 'react';
import Radio from '../src/Radio';
import RadioGroup from '../src/RadioGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'RadioGroup',
};

export const 基本使用 = () => (
  <StoryLayout>
    <RadioGroup onChange={(event, value) => console.log(value)} value="3">
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 基本使用无value = () => (
  <StoryLayout>
    <RadioGroup onChange={(event, value) => console.log(value)}>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 设置纵向排列 = () => (
  <StoryLayout>
    <RadioGroup block>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 设置只读 = () => (
  <StoryLayout>
    <p>不可用：</p>
    <RadioGroup disabled>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
    <p>只读：</p>
    <RadioGroup readOnly>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 设置标题显示位置 = () => (
  <StoryLayout>
    <p>标题在右侧显示：</p>
    <RadioGroup>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
    </RadioGroup>
    <p>标题在左侧显示：</p>
    <RadioGroup labelPosition="left">
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
    </RadioGroup>
  </StoryLayout>
);
