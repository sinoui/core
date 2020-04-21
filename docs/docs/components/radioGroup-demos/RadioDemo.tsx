import React, { useState } from 'react';
import Radio from '@sinoui/core/Radio';
import type { RadioProps } from '@sinoui/core/Radio';

export default function RadioDemo(props: RadioProps<string>) {
  const [checked, setChecked] = useState(false);

  return <Radio checked={checked} onChange={setChecked} {...props} />;
}
