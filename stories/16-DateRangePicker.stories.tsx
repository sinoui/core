import React, { useState } from 'react';
import DateRangeHeader from '@sinoui/core/DateRangePicker/DateRangePcPopper/DateRangeHeader';
import DateRangeView from '@sinoui/core/DateRangePicker/DateRangePcPopper/DateRangeView';
import DateRangePicker from '@sinoui/core/DateRangePicker';
import styled from 'styled-components';
import StoryLayout from './StoryLayout';

export default {
  title: 'DateRangePicker',
};

export const 头部 = () => (
  <StoryLayout>
    <DateRangeHeader
      startYear={2020}
      startMonth={5}
      onChange={(value) => {
        console.log(value);
      }}
    />
  </StoryLayout>
);

export const 日期区间展示 = () => (
  <StoryLayout>
    <DateRangeView />
  </StoryLayout>
);

const StyledDateRangePicker = styled(DateRangePicker)`
  width: 200px;
  margin-top: 8px;
`;

function DateRangePickerDemo(props: any) {
  const [value, setValue] = useState(['2020-06-16', '2020-07-28']);
  return (
    <StyledDateRangePicker
      {...props}
      value={value}
      onChange={(_value) => setValue(_value)}
    />
  );
}

export const 日期区间选择 = () => (
  <StoryLayout>
    <DateRangePickerDemo />
  </StoryLayout>
);

export const 移动端日期区间选择 = () => (
  <StoryLayout>
    <DateRangePickerDemo isPc={false} />
  </StoryLayout>
);

export const 不可用 = () => (
  <StoryLayout>
    <DateRangePickerDemo disabled />
  </StoryLayout>
);

export const 输入框模式 = () => (
  <StoryLayout>
    <DateRangePickerDemo />
    <DateRangePickerDemo variant="outlined" />
    <DateRangePickerDemo variant="filled" />
  </StoryLayout>
);
