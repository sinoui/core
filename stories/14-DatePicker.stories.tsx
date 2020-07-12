import React, { useState } from 'react';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import H6 from '@sinoui/core/H6';
import H5 from '@sinoui/core/H5';
import Divider from '@sinoui/core/Divider';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import CalendarView from '@sinoui/core/DatePicker/CalendarView';
import YearSelectView from '@sinoui/core/DatePicker/YearSelectView/YearSelectView';
import Paper from '@sinoui/core/Paper';
import MonthSelectView from '@sinoui/core/DatePicker/MonthSelectView/MonthSelectView';
import DatePicker from '@sinoui/core/DatePicker';
import Body1 from '@sinoui/core/Body1';
import styled from 'styled-components';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import Button from '@sinoui/core/Button';
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

const CalendarViewDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <>
      <CalendarView
        value={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date(2020, 4, 1)}
        maxDate={new Date(2020, 7, 20)}
        startOfWeek={1}
        isPc
      />
      <Body1>当前选中日期:{formatDate(selectedDate)}</Body1>
    </>
  );
};

export const 日历视图 = () => (
  <StoryLayout>
    <CalendarViewDemo />
  </StoryLayout>
);

export const 年视图 = () => (
  <StoryLayout>
    <Paper style={{ display: 'inline-block' }}>
      <YearSelectView selectedYear={2020} maxYear={2022} />
    </Paper>
  </StoryLayout>
);

export const 月视图 = () => (
  <StoryLayout>
    <Paper style={{ display: 'inline-block' }}>
      <MonthSelectView />
    </Paper>
  </StoryLayout>
);

const StyledDatepicker = styled(DatePicker)`
  width: 200px;
  margin: 8px;
`;

function DatePickerDemo(props: any) {
  const [value, setValue] = useState<string | undefined>('sdf');
  return (
    <StyledDatepicker
      value={value}
      onChange={(_value) => setValue(_value)}
      {...props}
    />
  );
}

export const 日期选择 = () => (
  <StoryLayout>
    <DatePickerDemo label="日期选择" />
    <DatePickerDemo label="日期选择" variant="filled" />
    <DatePickerDemo label="日期选择" variant="outlined" />
    <DatePickerDemo label="Disabled" disabled />
    <DatePickerDemo label="Disabled" variant="filled" disabled />
    <DatePickerDemo label="Disabled" variant="outlined" disabled />
    <DatePickerDemo label="ReadOnly" readOnly />
    <DatePickerDemo label="ReadOnly" variant="filled" readOnly />
    <DatePickerDemo label="ReadOnly" variant="outlined" readOnly />
  </StoryLayout>
);

const DatePickerDemo2 = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <>
      <StyledDatepicker value={value} onChange={setValue} />
      <div>
        <Button onClick={() => setValue('2020-06-09')} raised>
          设置为2020-06-09
        </Button>
      </div>
    </>
  );
};

export const 日期选择同步 = () => (
  <StoryLayout>
    <DatePickerDemo2 />
  </StoryLayout>
);

export const 日期范围 = () => (
  <StoryLayout>
    <DatePickerDemo
      label="日期选择"
      min="2020-06-04"
      placeholder="最小日期为2020-06-04"
    />
    <DatePickerDemo
      label="日期选择"
      max="2020-06-20"
      placeholder="最大日期为2020-06-20"
    />
    <DatePickerDemo
      label="日期选择"
      min="2020-06-04"
      max="2020-06-20"
      placeholder="日期区间：2020-06-04 ~ 2020-06-20"
    />
  </StoryLayout>
);

export const 清除功能 = () => (
  <StoryLayout>
    <DatePickerDemo label="日期选择" min="2020-06-04" allowClear />
  </StoryLayout>
);

export const pc形态 = () => (
  <StoryLayout>
    <DatePickerDemo isPc />
  </StoryLayout>
);

export const mobile形态 = () => (
  <StoryLayout>
    <DatePickerDemo isPc={false} />
  </StoryLayout>
);
