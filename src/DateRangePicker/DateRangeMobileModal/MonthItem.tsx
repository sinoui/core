import React, { useMemo } from 'react';
import { MONTH_FULL_TITLES } from '@sinoui/core/DatePicker/constants';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import styled from 'styled-components';
import DatesViewStatus from '../DatesViewStatus';
import isSameMonth from '../helpers/isSameMonth';
import getDisabledDates from '../helpers/getDisabledDates';

const dateCellRect = {
  width: 48,
  height: 48,
  padding: 4,
};

const YearItem = styled.div`
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding-left: 12px;
`;

const MemoDatesViewStatus = React.memo(DatesViewStatus);

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

  const outlinedDate =
    showToday && isSameMonth(new Date(), year, monthIdx)
      ? new Date().getDate()
      : undefined;

  const selectedDates = useMemo(() => {
    return [startDate, endDate]
      .map((date) =>
        isSameMonth(date, year, monthIdx) ? date.getDate() : undefined,
      )
      .filter(Boolean);
  }, [endDate, monthIdx, startDate, year]);

  const disabledDates = useMemo(
    () => getDisabledDates(year, monthIdx, minDate, maxDate),
    [maxDate, minDate, monthIdx, year],
  );

  return (
    <div key={`${year}_${month}`} style={style}>
      {startDate && endDate && (
        <MemoDatesViewStatus
          year={year}
          month={monthIdx}
          startDate={startDate}
          endDate={endDate}
          dateCellRect={dateCellRect}
          isPc={false}
        />
      )}
      <YearItem>
        {year}年{month}
      </YearItem>
      <DatesView
        year={year}
        month={index % 12}
        selectedDates={selectedDates as number[]}
        outlinedDate={outlinedDate}
        disabledDates={disabledDates}
        onDateClick={onDateClick}
      />
    </div>
  );
}

export default React.memo(MonthItem);
