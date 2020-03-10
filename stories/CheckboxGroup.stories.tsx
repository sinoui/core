import React from 'react';
import Checkbox from '../src/Checkbox';
import CheckboxGroup from '../src/CheckboxGroup';
import StoryLayout from './StoryLayout';

export default {
  title: 'CheckboxGroup',
};

export const 基本使用 = () => (
  <StoryLayout>
    <CheckboxGroup onChange={(value) => console.log(value)} value={['2', '3']}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);
export const 基本使用没有value = () => (
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
    <CheckboxGroup
      onChange={(value) => console.log(value)}
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
    <CheckboxGroup enableSelectAll onChange={(value) => console.log(value)}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置不可用 = () => (
  <StoryLayout>
    <p>不可用:</p>
    <CheckboxGroup disabled>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
    <p>只读:</p>
    <CheckboxGroup readOnly>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置是否纵向显示 = () => (
  <StoryLayout>
    <CheckboxGroup column>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置标题显示位置 = () => (
  <StoryLayout>
    <p>标题显示在右侧：</p>
    <CheckboxGroup>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
    <p>标题显示在左侧：</p>
    <CheckboxGroup labelPosition="left">
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置网格对齐布局默认3列 = () => (
  <StoryLayout>
    <p>默认：</p>
    <CheckboxGroup gridLayout>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
      <Checkbox value="5">复选框5</Checkbox>
    </CheckboxGroup>
    <p>设置colums为4：</p>
    <CheckboxGroup gridLayout columns={4}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
      <Checkbox value="5">复选框5</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);

export const 设置是否是紧缩型 = () => (
  <StoryLayout>
    <CheckboxGroup dense>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
      <Checkbox value="5">复选框5</Checkbox>
    </CheckboxGroup>
  </StoryLayout>
);
