import React, { useState } from 'react';
import ToggleButton from '@sinoui/core/ToggleButton';
import Done from '@sinoui/icons/Done';
import StoryLayout from './StoryLayout';

export default {
  title: '切换按钮',
};

export const 单个按钮 = () => {
  const [selected, setSelected] = useState(false);

  return (
    <StoryLayout>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => setSelected(!selected)}
      >
        <Done />
      </ToggleButton>
    </StoryLayout>
  );
};
