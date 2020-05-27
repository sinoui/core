import React from 'react';
import Chip from '@sinoui/core/Chip';
import StoryLayout from './StoryLayout';

export default {
  title: 'Chip',
};

export const 基本使用 = () => (
  <StoryLayout>
    <>
      <Chip label="这是文本" />
      <Chip
        label="Delete"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="Disabled" disabled />
      <Chip
        label="Disabled"
        disabled
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
    </>
  </StoryLayout>
);

export const 边框模式 = () => (
  <StoryLayout>
    <>
      <Chip label="这是文本" variant="outlined" />
      <Chip
        label="Delete"
        variant="outlined"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="Disabled" variant="outlined" disabled />
      <Chip
        label="Disabled"
        variant="outlined"
        disabled
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
    </>
  </StoryLayout>
);

export const 可点击的Chip = () => (
  <StoryLayout>
    <>
      <Chip label="Clickable" clickable />
      <Chip
        label="Delete"
        clickable
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip
        label="Disable"
        clickable
        disabled
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="Clickable" clickable variant="outlined" />
      <Chip
        label="Delete"
        variant="outlined"
        clickable
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip
        label="Disable"
        clickable
        disabled
        variant="outlined"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
    </>
  </StoryLayout>
);
