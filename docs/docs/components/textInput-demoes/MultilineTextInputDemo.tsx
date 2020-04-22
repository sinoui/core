/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
import TextInput from '@sinoui/core/TextInput';
import React, { useState } from 'react';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import Divider from '@sinoui/core/Divider';
import Subtitle1 from '@sinoui/core/Subtitle1';

const style = {
  width: 320,
  margin: '8px 0',
};

const optionStyle = {
  margin: 8,
};

const toNum = (v: string | undefined) =>
  !v || isNaN(v) ? undefined : parseInt(v, 10);

function MultilineTextInputDemo() {
  const [value, setValue] = useState('');
  const [variant, setVariant] = useState<'standard' | 'filled' | 'outlined'>(
    'outlined',
  );
  const [minRows, setMinRows] = useState<string | undefined>();
  const [maxRows, setMaxRows] = useState<string | undefined>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div
        style={{
          width: 320,
        }}
      >
        <Subtitle1>选项</Subtitle1>
        <label
          htmlFor="variant"
          style={{
            fontSize: 16,
            transform: 'scale(0.75)',
            color: 'rgba(0, 0, 0, 0.54)',
          }}
        >
          variant
        </label>
        <RadioGroup id="variant" value={variant} onChange={setVariant as any}>
          <Radio value="standard">standard</Radio>
          <Radio value="filled">filled</Radio>
          <Radio value="outlined">outlined</Radio>
        </RadioGroup>
        <TextInput
          value={minRows}
          onChange={(event) => setMinRows(event.target.value)}
          label="minRows"
          variant="outlined"
          style={optionStyle}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <TextInput
          value={maxRows}
          type="number"
          onChange={(event) => setMaxRows(event.target.value)}
          label="maxRows"
          variant="outlined"
          style={optionStyle}
          inputProps={{
            min: toNum(minRows) ?? 0,
          }}
        />
      </div>
      <Divider vertical marginHorizontal={16} flexItem />
      <div style={{ flex: 1 }}>
        <Subtitle1>展示效果</Subtitle1>
        <TextInput
          multiline
          variant={variant}
          label="多行输入框"
          style={style}
          value={value}
          onChange={handleChange}
          minRows={toNum(minRows)}
          maxRows={toNum(maxRows)}
        />
      </div>
    </div>
  );
}

export default MultilineTextInputDemo;
