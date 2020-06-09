import React from 'react';
import DateRangeContent from '@sinoui/core/DateRangePicker/DateRangeContent';
import DateRangeHeader from '@sinoui/core/DateRangePicker/DateRangeHeader';
import StoryLayout from './StoryLayout';

export default {
  title: 'DateRangePicker',
};

export const 头部 = () => (
  <StoryLayout>
    <DateRangeHeader
      startYear={2020}
      endYear={2020}
      startMonth={5}
      endMonth={6}
      onChange={(value) => {
        console.log(value);
      }}
    />
  </StoryLayout>
);

export const 日期区间 = () => (
  <StoryLayout>
    <DateRangeContent />
  </StoryLayout>
);
