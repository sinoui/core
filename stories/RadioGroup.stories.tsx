import React from 'react';
import Radio from '../src/Radio';
import RadioGroup from '../src/RadioGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'RadioGroup',
};

export const 基本单选框 = () => (
  <StoryLayout>
    <RadioGroup onChange={(event, value) => console.log(value)} value="3">
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 基本单选框无value = () => (
  <StoryLayout>
    <RadioGroup onChange={(event, value) => console.log(value)}>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 纵向排列 = () => (
  <StoryLayout>
    <RadioGroup block>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 只读 = () => (
  <StoryLayout>
    <RadioGroup readOnly>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
    <RadioGroup disabled>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 标题显示位置 = () => (
  <StoryLayout>
    <RadioGroup>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
    </RadioGroup>
    <RadioGroup labelPosition="left">
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 是否是紧缩型 = () => (
  <StoryLayout>
    <RadioGroup dense>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
    </RadioGroup>
  </StoryLayout>
);
