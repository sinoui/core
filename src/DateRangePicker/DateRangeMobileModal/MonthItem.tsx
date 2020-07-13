import React from 'react';
import { MONTH_FULL_TITLES } from '@sinoui/core/DatePicker/constants';
import styled from 'styled-components';
import SimpleMonthDatesView from '@sinoui/core/DatePicker/DatesView/SimpleMonthDatesView';
import DatesViewStatus from '../DatesViewStatus';

const YearItem = styled.div`
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding-left: 12px;
`;

const MemoDatesViewStatus = React.memo(DatesViewStatus);
const MemoDatesView = React.memo(SimpleMonthDatesView);

/**
 * 移动端每个月份日期渲染
 * @param param0
 */
function MonthItem({ index, style, data }: any) {
  const monthIdx = index % 12;
  const {
    years,
    startDate,
    endDate,
    showToday,
    minDate,
    maxDate,
    onDateClick,
  } = data;
  const month = MONTH_FULL_TITLES[monthIdx];
  const year = years[Math.floor(index / 12)];

  return (
    <div key={`${year}_${month}`} style={style}>
      {startDate && endDate && (
        <MemoDatesViewStatus
          year={year}
          month={monthIdx}
          startDate={startDate}
          endDate={endDate}
          isPc={false}
        />
      )}
      <YearItem>
        {year}年{month}
      </YearItem>
      <MemoDatesView
        year={year}
        month={index % 12}
        value={[startDate, endDate]}
        minDate={minDate}
        maxDate={maxDate}
        showToday={showToday}
        onDateClick={onDateClick}
      />
    </div>
  );
}

export default React.memo(MonthItem);
