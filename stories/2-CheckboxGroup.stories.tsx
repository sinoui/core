import React from 'react';
import Checkbox from '@sinoui/core/Checkbox';
import { CheckboxGroup } from '@sinoui/core/CheckboxGroup';
import { storiesOf } from '@storybook/react';
import StoryLayout from './StoryLayout';

export default {
  title: 'CheckboxGroup',
};

storiesOf('CheckboxGroup', module)
  .add('基本复选框', () => (
    <StoryLayout>
      <CheckboxGroup onChange={(value) => alert(value)} value="3">
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
        <Checkbox value="3">复选框3</Checkbox>
        <Checkbox value="4">复选框4</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('是否支持全选', () => (
    <StoryLayout>
      <CheckboxGroup enableSelectAll onChange={(value) => console.log(value)}>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
        <Checkbox value="3">复选框3</Checkbox>
        <Checkbox value="4">复选框4</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('复选框不可用', () => (
    <StoryLayout>
      <CheckboxGroup disabled>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup readOnly>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('纵向显示', () => (
    <StoryLayout>
      <CheckboxGroup column>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('指定Checkbox的颜色', () => (
    <StoryLayout>
      <CheckboxGroup color="accent">
        <Checkbox checked value="1">
          复选框1
        </Checkbox>
        <Checkbox checked value="2">
          复选框2
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup color="success">
        <Checkbox checked value="1">
          复选框1
        </Checkbox>
        <Checkbox checked value="2">
          复选框2
        </Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('标题显示位置', () => (
    <StoryLayout>
      <CheckboxGroup>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup labelPosition="left">
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('网格对齐布局,默认3列', () => (
    <StoryLayout>
      <CheckboxGroup gridLayout>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
        <Checkbox value="3">复选框3</Checkbox>
        <Checkbox value="4">复选框4</Checkbox>
        <Checkbox value="5">复选框5</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup gridLayout columns={4}>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
        <Checkbox value="3">复选框3</Checkbox>
        <Checkbox value="4">复选框4</Checkbox>
        <Checkbox value="5">复选框5</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('获取焦点事件监听器', () => (
    <StoryLayout>
      <CheckboxGroup onFocus={() => alert('获取焦点')}>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ))
  .add('失去焦点事件监听器', () => (
    <StoryLayout>
      <CheckboxGroup onBlur={() => alert('失去焦点')}>
        <Checkbox value="1">复选框1</Checkbox>
        <Checkbox value="2">复选框2</Checkbox>
      </CheckboxGroup>
    </StoryLayout>
  ));
