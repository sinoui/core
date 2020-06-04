import React, { useState } from 'react';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import H6 from '@sinoui/core/H6';
import H5 from '@sinoui/core/H5';
import Divider from '@sinoui/core/Divider';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import CalendarView from '@sinoui/core/DatePicker/CalendarView';
import StoryLayout from './StoryLayout';

export default {
  title: 'DatePicker',
};

export const 日视图 = () => (
  <StoryLayout>
    <H5>从星期一开始</H5>
    <H6>2020年6月</H6>
    <DatesView
      year={2020}
      month={5}
      selectedDates={[1]}
      outlinedDate={3}
      disabledDates={[10, 20, 14, 15, 18]}
      showNextMonthDates
    />
    <H6 style={{ marginTop: 16 }}>2020年5月</H6>
    <DatesView year={2020} month={4} selectedDates={[20, 29]} />
    <H6 style={{ marginTop: 16 }}>2019年2月</H6>
    <DatesView year={2019} month={1} />

    <Divider style={{ margin: '16px 0' }} />

    <H5>从星期日开始</H5>
    <H6>2020年6月</H6>
    <DatesView year={2020} month={5} startOfWeek={0} />
    <H6 style={{ marginTop: 16 }}>2020年5月</H6>
    <DatesView year={2020} month={4} startOfWeek={0} />
    <H6 style={{ marginTop: 16 }}>2019年2月</H6>
    <DatesView year={2019} month={1} startOfWeek={0} />
  </StoryLayout>
);

const DatesViewClickSelectDemo = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const [selectedDates, setSelectedDates] = useState([date]);
  const outlinedDate = selectedDates.includes(date) ? undefined : date;

  return (
    <DatesView
      year={year}
      month={month}
      startOfWeek={0}
      outlinedDate={outlinedDate}
      selectedDates={selectedDates}
      onDateClick={(_, dateValue) => setSelectedDates([dateValue.getDate()])}
    />
  );
};

export const 点击选中 = () => (
  <StoryLayout>
    <DatesViewClickSelectDemo />
  </StoryLayout>
);

export const 周标题栏 = () => (
  <StoryLayout>
    <WeekTitleBar />
    <WeekTitleBar startOfWeek={0} />
  </StoryLayout>
);

export const 日历视图 = () => (
  <StoryLayout>
    <CalendarView />
  </StoryLayout>
);
