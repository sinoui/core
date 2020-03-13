import React, { useState } from 'react';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';

export default function CheckboxGroupDemo() {
  const [value, setValue] = useState(['2', '3']);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    setValue(event.target.value);
  };

  return (
    <CheckboxGroup onChange={onChange} value={value}>
      <Checkbox value="1">复选框1</Checkbox>
      <Checkbox value="2">复选框2</Checkbox>
      <Checkbox value="3">复选框3</Checkbox>
      <Checkbox value="4">复选框4</Checkbox>
    </CheckboxGroup>
  );
}
