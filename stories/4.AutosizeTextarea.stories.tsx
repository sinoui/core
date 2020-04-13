import React, { useState } from 'react';
import AutosizeTextarea from '@sinoui/core/AutosizeTextarea/AutosizeTextarea';

export default {
  title: 'AutosizeTextarea',
};

const AutosizeTextareaDemo = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <AutosizeTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <AutosizeTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minRows={2}
      />
      <AutosizeTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxRows={5}
      />
    </>
  );
};

export const 验证 = () => <AutosizeTextareaDemo />;
