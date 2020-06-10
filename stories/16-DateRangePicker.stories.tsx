import React, { useState } from 'react';
import DateRangeHeader from '@sinoui/core/DateRangePicker/DateRangeHeader';
import DateRangeView from '@sinoui/core/DateRangePicker/DateRangeView';
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
`;

function DateRangePickerDemo(props: any) {
  const [value, setValue] = useState(['2020-06-16', '2020-07-08']);
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
