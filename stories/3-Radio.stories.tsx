import React from 'react';
import Radio from '../src/Radio';
import { storiesOf } from '@storybook/react';
import StoryLayout from './StoryLayout';

export default {
  title: 'Radio',
};

storiesOf('Radio', module).add('基本单选框', () => (
  <StoryLayout>
    <Radio
      value="1"
      onChange={(event, checked) => console.log(event.target.value, checked)}
      onClick={() => console.log('1')}
    >
      单选框1
    </Radio>
  </StoryLayout>
));
