import React, { useState } from 'react';
import TimeList, { Props } from '@sinoui/core/TimePicker/TimeList/TimeList';
import TimeSelectView, {
  Props as TimeSelectViewProps,
} from '@sinoui/core/TimePicker/TimeSelectView';
import Paper from '@sinoui/core/Paper';
import TimePicker from '@sinoui/core/TimePicker';
import StoryLayout from './StoryLayout';

export default {
  title: 'TimePicker',
};

const TimeListDemo = (
  props: Omit<Props, 'selected'> & { initialValue?: number },
) => {
  const { initialValue, ...rest } = props;
  const [value, setValue] = useState(initialValue ?? 0);
  return <TimeList selected={value} onChange={setValue} {...rest} />;
};

export const 时间列表 = () => (
  <StoryLayout>
    <TimeListDemo start={0} end={23} initialValue={12} />
  </StoryLayout>
);

export const 时间间隔 = () => (
  <StoryLayout>
    <TimeListDemo start={0} end={59} initialValue={12} step={5} />
  </StoryLayout>
);

const TimeSelectViewDemo = (props: TimeSelectViewProps) => {
  const [value, setValue] = useState<[number | undefined, number | undefined]>([
    undefined,
    undefined,
  ]);

  return (
    <TimeSelectView
      hour={value[0]}
      minute={value[1]}
      onChange={(hour, minute) => setValue([hour, minute])}
      autoFocus
      {...props}
    />
  );
};

export const 时间选择视图 = () => (
  <StoryLayout>
    <Paper style={{ display: 'inline-block' }}>
      <TimeSelectViewDemo />
    </Paper>
  </StoryLayout>
);

export const 时间选择间隔视图 = () => (
  <StoryLayout>
    <Paper style={{ display: 'inline-block' }}>
      <TimeSelectViewDemo minuteStep={5} />
    </Paper>
  </StoryLayout>
);

const TimePickerDemo = () => {
  const [value, setValue] = useState<string | undefined>();

  return <TimePicker value={value} onChange={setValue} label="时间选择" />;
};

export const 时间选择 = () => (
  <StoryLayout>
    <TimePickerDemo />
  </StoryLayout>
);
