import React from 'react';
import styled, { css } from 'styled-components';
import useEventCallback from '@sinoui/core/utils/useEventCallback';
import getDatesOfMonth from './getDatesOfMonth';
import getEmptyDatesOfMonth from './getEmptyDatesOfMonth';
import DateCell from './DateCell';
import leadingZero from '../leadingZero';
import dateCellStyle from './dateCellStyle';
import { CLASSES } from '../constants';

export interface Props {
  /**
   * 指定日视图的年份
   */
  year: number;
  /**
   * 指定日视图的月份
   */
  month: number;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
  /**
   * 选中的日期
   */
  selectedDates?: number[];
  /**
   * 使用圆圈标注的日期
   */
  outlinedDate?: number;
  /**
   * 禁用的日期
   */
  disabledDates?: number[];
  /**
   * 设置为`true`，则显示下个月的部分日期。默认为`false`。
   */
  showNextMonthDates?: boolean;

  /**
   * 日期单元格点击事件的回调函数。
   */
  onDateClick?: (event: React.MouseEvent<HTMLElement>, date: Date) => void;
  /**
   * 是否是PC设备
   */
  isPc?: boolean;
}

const mobileStyle = css`
  -ms-grid-column-span: 4px;
  grid-column-gap: 4px;
`;

const pcStyle = css`
  -ms-grid-column-span: 0px;
  grid-column-gap: 0px;
`;

const mobileContentStyle = css`
  height: 36px;
  width: 36px;

  .sinoui-date-cell-ripple-layout,
  .sinoui-date-cell-ripple {
    height: 36px;
    width: 36px;
  }
`;

const pcContentStyle = css`
  height: 28px;
  width: 28px;
  font-size: 12px;
  .sinoui-date-cell-ripple-layout,
  .sinoui-date-cell-ripple {
    height: 28px;
    width: 28px;
  }
`;

/**
 * 日期视图容器
 */
const DatesViewWrapper = styled.div<{ $isPc?: boolean }>`
  ${mobileStyle}
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  -ms-grid-rows: auto auto auto auto auto auto;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, auto);

  ${({ $isPc }) => $isPc && pcStyle}
  .${CLASSES.dateCellContent}{
    ${mobileContentStyle}
    ${({ $isPc }) => $isPc && pcContentStyle}
  }
  ${dateCellStyle};
  
`;

export const getColumn = (index: number) => {
  const columnIndex = index % 7;
  return columnIndex === 0 ? 7 : columnIndex;
};

export const getRow = (index: number) => Math.ceil(index / 7);
const MemoDateCell = React.memo(DateCell);

/**
 * 一个月的日网格视图
 */
export default function DatesView(props: Props) {
  const {
    year,
    month,
    startOfWeek = 1,
    selectedDates = [],
    disabledDates = [],
    outlinedDate,
    showNextMonthDates,
    onDateClick,
    isPc,
    ...rest
  } = props;
  const dates = getDatesOfMonth(year, month);
  const emptyDates = getEmptyDatesOfMonth(year, month, startOfWeek);
  const dateCells: React.ReactElement[] = [];
  const nextMonthDates =
    showNextMonthDates && (dates + emptyDates) % 7 !== 0
      ? 7 - ((dates + emptyDates) % 7)
      : 0;

  const handleDateCellClick = useEventCallback(
    (event: React.MouseEvent<HTMLElement>, date: number) => {
      if (onDateClick) {
        onDateClick(event, new Date(year, month, date, 0, 0, 0));
      }
    },
  );

  for (let i = 0; i < emptyDates; i += 1) {
    dateCells.push(<DateCell key={i} row={1} column={i + 1} isPc={isPc} />);
  }

  for (let i = 0; i < dates; i += 1) {
    const dateStr = `${year}-${leadingZero(month + 1)}-${leadingZero(i + 1)}`;
    dateCells.push(
      <MemoDateCell
        date={i + 1}
        key={dateStr}
        isPc={isPc}
        selected={selectedDates.includes(i + 1)}
        disabled={disabledDates.includes(i + 1)}
        outlined={outlinedDate === i + 1}
        column={getColumn(dateCells.length + 1)}
        row={getRow(dateCells.length + 1)}
        data-date={dateStr}
        onClick={handleDateCellClick}
      />,
    );
  }

  for (let i = 0; i < nextMonthDates; i += 1) {
    const dateStr = `${year}-${leadingZero(month + 2)}-${leadingZero(i + 1)}`;
    dateCells.push(
      <MemoDateCell
        date={i + 1}
        key={dateStr}
        isPc={isPc}
        disabled
        column={getColumn(dateCells.length + 1)}
        row={getRow(dateCells.length + 1)}
        data-date={dateStr}
      />,
    );
  }

  return (
    <DatesViewWrapper className="sinoui-dates-view" {...rest} $isPc={isPc}>
      {dateCells}
    </DatesViewWrapper>
  );
}
