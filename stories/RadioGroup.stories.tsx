import React, { useState } from 'react';
import Radio from '@sinoui/core/Radio';
import RadioGroup from '@sinoui/core/RadioGroup';
import styled from 'styled-components';
import type { RadioGroupProps } from '../src/RadioGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'RadioGroup',
};

const StyleRadioGroup = styled(RadioGroup)`
  .sinoui-radio__input {
    width: 10px;
    height: 10px;
  }
`;

const RadioGroupDemo = (props: RadioGroupProps<string>) => {
  const [value, setValue] = useState<string | undefined>('2');

  const onChange = (currentValue) => {
    console.log('点击了');
    setValue(currentValue);
  };

  return (
    <StyleRadioGroup onChange={onChange} value={value} {...props}>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </StyleRadioGroup>
  );
};

const items = [
  { value: '1', name: 'item1' },
  { value: '2', name: 'item2' },
  { value: '3', name: 'item3' },
];
const RadioGroupComplexDemo = (
  props: RadioGroupProps<{ value: string; name: string }>,
) => {
  const [value, setValue] = useState<
    undefined | { value: string; name: string }
  >(items[1]);

  return (
    <RadioGroup onChange={setValue} value={value} {...props}>
      {items.map((item) => (
        <Radio value={item} id={item.value}>
          单选框{item.value}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export const 基本使用 = () => (
  <StoryLayout>
    <RadioGroupDemo />
  </StoryLayout>
);

export const 复杂数据结构使用 = () => (
  <StoryLayout>
    <RadioGroupComplexDemo />
  </StoryLayout>
);

export const 设置items属性 = () => (
  <StoryLayout>
    <RadioGroupDemo
      items={[
        { value: '1', label: 'item1' },
        { value: '2', label: 'item2' },
        { value: '3', label: 'item3' },
        { value: '4', label: 'item4' },
      ]}
    />
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
