import React, { useState } from 'react';
import RadioGroup, { RadioGroupProps } from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';

export default function RadioGroupDemo(props: RadioGroupProps<string>) {
  const [value, setValue] = useState<string | undefined>('2');

  return (
    <RadioGroup onChange={setValue} value={value} {...props}>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  );
}
