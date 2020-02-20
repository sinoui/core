import React, { useState, useCallback } from 'react';
import Checkbox from '@sinoui/core/Checkbox';
import { storiesOf } from '@storybook/react';
import StoryLayout from './StoryLayout';

export default {
  title: 'Checkbox',
};

function StatefulCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <>
      <Checkbox checked={checked} onChange={handleChange} />
      <Checkbox />
    </>
  );
}

storiesOf('Checkbox', module)
  .add('simple checkbox', () => (
    <StoryLayout>
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
    </StoryLayout>
  ))
  .add('with label', () => (
    <StoryLayout>
      <Checkbox>爱好1</Checkbox>
      <Checkbox checked>爱好2</Checkbox>
      <Checkbox>爱好3</Checkbox>
    </StoryLayout>
  ))
  .add('with state', () => (
    <StoryLayout>
      <StatefulCheckbox />
    </StoryLayout>
  ))
  .add('disabled', () => (
    <StoryLayout>
      <Checkbox disabled />
      <Checkbox disabled checked />
    </StoryLayout>
  ))
  .add('color', () => (
    <StoryLayout>
      <Checkbox checked color="accent" />
      <Checkbox checked color="success" />
    </StoryLayout>
  ));
