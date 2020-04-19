import React, { useState } from 'react';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import type { CheckboxGroupProps } from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';

export default function CheckboxGroupDemo(props: CheckboxGroupProps<string>) {
  const [value, setValue] = useState<string[] | undefined>(['2', '3']);

  return (
    <CheckboxGroup onChange={setValue} value={value} {...props}>
      <Checkbox value="1">选项1</Checkbox>
      <Checkbox value="2">选项2</Checkbox>
      <Checkbox value="3">选项3</Checkbox>
      <Checkbox value="4">选项4</Checkbox>
    </CheckboxGroup>
  );
}
