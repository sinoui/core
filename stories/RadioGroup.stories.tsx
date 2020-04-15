import React, { useState } from 'react';
import Radio from '@sinoui/core/Radio';
import RadioGroup from '@sinoui/core/RadioGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'RadioGroup',
};

const RadioGroupDemo = (props: any) => {
  const [value, setValue] = useState('2');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  console.log(value);

  return (
    <RadioGroup onChange={onChange} value={value} {...props}>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  );
};

export const 基本使用 = () => (
  <StoryLayout>
    <RadioGroupDemo />
  </StoryLayout>
);

export const 非受控使用 = () => (
  <StoryLayout>
    <RadioGroup
      onChange={(event: React.ChangeEvent<HTMLInputElement>, value) =>
        console.log(event.target.value)
      }
    >
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  </StoryLayout>
);

export const 设置纵向排列 = () => (
  <StoryLayout>
    <RadioGroupDemo column />
  </StoryLayout>
);

export const 设置只读 = () => (
  <StoryLayout>
    <p>不可用：</p>
    <RadioGroup disabled value="2">
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
    <p>只读：</p>
    <RadioGroup readOnly value="3">
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
    <RadioGroupDemo />
    <p>标题在左侧显示：</p>
    <RadioGroupDemo labelPosition="left" />
  </StoryLayout>
);
