import React, { useState } from 'react';
import Checkbox from '@sinoui/core/Checkbox';
import type { CheckboxProps } from '@sinoui/core/Checkbox';

export default function CheckboxDemo(props: CheckboxProps<string>) {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onChange={setChecked} {...props} />;
}
