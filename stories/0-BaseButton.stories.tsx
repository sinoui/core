import React from 'react';
import BaseButton from '@sinoui/core/BaseButton';

export default {
  title: 'BaseButton',
};

export const 包含文本 = () => <BaseButton>按钮</BaseButton>;

export const 包含Emoji = () => (
  <BaseButton>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </BaseButton>
);
