import React, { useMemo } from 'react';
import ChevronLeftIcon from '@sinoui/core/svg-icons/ChevronLeftIcon';
import SmallIconButton from '@sinoui/core/DatePicker/CalendarView/SmallIconButton';
import styled from 'styled-components';
import Body1 from '@sinoui/core/Body1';
import DateRangeHeaderWrapper from './DateRangeHeaderWrapper';

export interface Props {
  startYear: number;
  startMonth: number;
  onChange: (startYear: number, startMonth: number) => void;
}

const monthTitles = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
];

const Title = styled(Body1)`
  flex: 1;
  text-align: center;
`;

/**
 * 日期区间选择的头部
 */
export default function DateRangeHeader(props: Props) {
  const { startYear, startMonth, onChange, ...other } = props;

  /**
   * 上个月
   */
  const handlePrevMonth = () => {
    const prevStartMonth = startMonth === 0 ? 11 : startMonth - 1;
    const prevStartYear = startMonth === 0 ? startYear - 1 : startYear;

    onChange(prevStartYear, prevStartMonth);
  };

  /**
   * 下个月
   */
  const handleNextMonth = () => {
    const nextStartMonth = startMonth === 11 ? 0 : startMonth + 1;
    const nextStartYear = startMonth === 11 ? startYear + 1 : startYear;

    onChange(nextStartYear, nextStartMonth);
  };

  const endMonth = useMemo(() => (startMonth === 11 ? 0 : startMonth + 1), [
    startMonth,
  ]);

  const endYear = useMemo(
    () => (startMonth === 11 ? startYear + 1 : startYear),
    [startMonth, startYear],
  );

  return (
    <DateRangeHeaderWrapper
      className="sinoui-date-range-picker-header"
      {...other}
    >
      <SmallIconButton
        className="sinoui-date-range-picker-header__prev-month-icon"
        onClick={handlePrevMonth}
      >
        <ChevronLeftIcon />
      </SmallIconButton>
      <Title className="sinoui-date-range-picker-header__title">
        {startYear}年{monthTitles[startMonth]}月
      </Title>
      <Title className="sinoui-date-range-picker-header__title">
        {endYear}年{monthTitles[endMonth]}月
      </Title>
      <SmallIconButton
        className="sinoui-date-range-picker-header__next-month-icon"
        onClick={handleNextMonth}
      >
        <ChevronLeftIcon />
      </SmallIconButton>
    </DateRangeHeaderWrapper>
  );
}
