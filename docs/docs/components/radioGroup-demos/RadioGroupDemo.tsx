import React, { useState } from 'react';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';

export default function RadioGroupDemo(props) {
  const [value, setValue] = useState('2');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadioGroup onChange={onChange} value={value} {...props}>
      <Radio value="1">单选框1</Radio>
      <Radio value="2">单选框2</Radio>
      <Radio value="3">单选框3</Radio>
      <Radio value="4">单选框4</Radio>
    </RadioGroup>
  );
}
