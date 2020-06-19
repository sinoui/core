import React, { useState } from 'react';
import DateTimeView from '@sinoui/core/DateTimePicker/DateTimeView/DateTimeView';
import DateTimePicker from '@sinoui/core/DateTimePicker';
import styled from 'styled-components';
import StoryLayout from './StoryLayout';

export default {
  title: 'DateTimePicker',
};

export const 日期时间选择视图 = () => (
  <StoryLayout>
    <DateTimeView isPc />
  </StoryLayout>
);

const StyledDateTimePicker = styled(DateTimePicker)`
  width: 200px;
  margin: 8px;
`;

function DateTimePickerDemo(props: any) {
  const [value, setValue] = useState('2020-06-18 15:30');

  return (
    <StyledDateTimePicker
      {...props}
      value={value}
      onChange={(date) => setValue(date as string)}
    />
  );
}

export const 日期时间选择 = () => (
  <StoryLayout>
    <DateTimePickerDemo label="日期时间选择" />
  </StoryLayout>
);

export const 自定义渲染方式 = () => (
  <StoryLayout>
    <DateTimePickerDemo
      min="2020-06-10 15:30"
      max="2020-06-20 15:30"
      renderValue={(value: Date) =>
        `${value.getFullYear()}-${
          value.getMonth() + 1
        }-${value.getDate()} ${value.getHours()}-${value.getMinutes()}`
      }
      allowClear
    />
  </StoryLayout>
);
