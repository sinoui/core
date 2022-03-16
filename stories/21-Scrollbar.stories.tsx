import React, { useState } from 'react';
import Scrollbar from '@sinoui/core/Scrollbar';
import StoryLayout from './StoryLayout';

export default {
  title: '滚动条',
};

export const 基础使用 = () => (
  <StoryLayout>
    <div style={{ width: 200, height: 200, border: '1px solid red' }}>
      <Scrollbar>
        <div style={{ width: 300, height: 300 }}>
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
        </div>
      </Scrollbar>
    </div>
  </StoryLayout>
);

export const 容器尺寸改变 = () => (
  <StoryLayout>
    <div style={{ width: '100%', height: '90vh', border: '1px solid red' }}>
      <Scrollbar>
        <div style={{ width: 1000, height: 300 }}>
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
        </div>
      </Scrollbar>
    </div>
  </StoryLayout>
);
