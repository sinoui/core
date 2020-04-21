import React, { useState } from 'react';
import FormControl from '@sinoui/core/FormControl';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';

interface FormValue {
  sex?: string;
  fav?: string[];
}

function CheckboxGroupDemo({ standard }: { standard?: boolean }) {
  const [formValue, setFormValue] = useState<FormValue>({});
  return (
    <form>
      <FormControl label="性别" labelLayout={standard ? 'standard' : 'shrink'}>
        <RadioGroup
          value={formValue.sex}
          onChange={(value) => setFormValue({ ...formValue, sex: value })}
        >
          <Radio value="female">女</Radio>
          <Radio value="male">男</Radio>
        </RadioGroup>
      </FormControl>
      <FormControl
        label="兴趣爱好"
        labelLayout={standard ? 'standard' : 'shrink'}
      >
        <CheckboxGroup
          value={formValue.fav}
          onChange={(value) => setFormValue({ ...formValue, fav: value })}
        >
          <Checkbox value="football">足球</Checkbox>
          <Checkbox value="basketball">篮球</Checkbox>
        </CheckboxGroup>
      </FormControl>
    </form>
  );
}

export default CheckboxGroupDemo;
