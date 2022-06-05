import Body1 from '@sinoui/core/Body1';
import SmallIconButton from '@sinoui/core/DatePicker/CalendarView/SmallIconButton';
import ChevronLeftIcon from '@sinoui/core/svg-icons/ChevronLeftIcon';
import { useMemo } from 'react';
import styled from 'styled-components';

import DateRangeHeaderWrapper from './DateRangeHeaderWrapper';

/**
 * 组件属性
 */
export interface Props {
  /**
   * 开始年份
   */
  startYear: number;
  /**
   * 开始月份
   */
  startMonth: number;
  /**
   * 开始年份和月份发生变化时的回调函数
   */
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
 *
 * @param props 组件属性
 */
const DateRangeHeader: React.FC<Props> = (props) => {
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

  const endMonth = useMemo(
    () => (startMonth === 11 ? 0 : startMonth + 1),
    [startMonth],
  );

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
      <div className="sinoui-date-range-picker-header__space" />
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
};

export default DateRangeHeader;
