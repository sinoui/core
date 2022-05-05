import React, { useState } from 'react';
import DateTimeView from '@sinoui/core/DateTimePicker/DateTimePcPopper/DateTimeView';
import DateTimePicker from '@sinoui/core/DateTimePicker';
import styled from 'styled-components';
import StoryLayout from './StoryLayout';

export default {
  title: 'DateTimePicker',
};

export const 日期时间选择视图 = () => (
  <StoryLayout>
    <DateTimeView
      date={new Date('2020-06-18')}
      hour={12}
      minute={20}
      minDate={new Date(2020, 5, 10, 12, 20)}
    />
  </StoryLayout>
);

const StyledDateTimePicker = styled(DateTimePicker)`
  width: 200px;
  margin: 8px;
`;

function DateTimePickerDemo(props: any) {
  const { value: inputValue } = props;
  const [value, setValue] = useState(inputValue ?? '2020-06-18 15:30');

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
        value
          ? `${value.getFullYear()}-${
              value.getMonth() + 1
            }-${value.getDate()} ${value.getHours()}-${value.getMinutes()}`
          : ''
      }
      allowClear
    />
  </StoryLayout>
);

export const 移动端渲染 = () => (
  <StoryLayout>
    <DateTimePickerDemo
      label="日期时间选择"
      isPc={false}
      min="2020-06-20 15:30"
    />
  </StoryLayout>
);

export const 提示语 = () => (
  <StoryLayout>
    <DateTimePickerDemo
      label="日期时间选择"
      placeholder="请选择日期和时间"
      allowClear
    />
  </StoryLayout>
);
