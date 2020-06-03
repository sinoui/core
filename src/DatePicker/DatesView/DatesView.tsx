import React from 'react';
import styled from 'styled-components';
import getDatesOfMonth from './getDatesOfMonth';
import getEmptyDatesOfMonth from './getEmptyDatesOfMonth';
import DateCell from './DateCell';

interface Props {
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
}

/**
 * 日期视图容器
 */
const DatesViewWrapper = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  -ms-grid-rows: auto auto auto auto auto auto;
  grid-template-columns: repeat(7, 1fr);
  -ms-grid-column-span: 4px;
  grid-column-gap: 4px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    -ms-grid-column-span: 0px;
    grid-column-gap: 0px;
  }
`;

export const getColumn = (index: number) => {
  const columnIndex = index % 7;
  return columnIndex === 0 ? 7 : columnIndex;
};

export const getRow = (index: number) => Math.ceil(index / 7);

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
    ...rest
  } = props;
  const dates = getDatesOfMonth(year, month);
  const emptyDates = getEmptyDatesOfMonth(year, month, startOfWeek);
  const dateCells: React.ReactElement[] = [];
  const nextMonthDates =
    showNextMonthDates && (dates + emptyDates) % 7 !== 0
      ? 7 - ((dates + emptyDates) % 7)
      : 0;

  for (let i = 0; i < emptyDates; i += 1) {
    dateCells.push(<DateCell key={i} row={1} column={i + 1} />);
  }

  for (let i = 0; i < dates; i += 1) {
    dateCells.push(
      <DateCell
        date={i + 1}
        key={`${year}_${month}_${i + 1}`}
        selected={selectedDates.includes(i + 1)}
        disabled={disabledDates.includes(i + 1)}
        outlined={outlinedDate === i + 1}
        column={getColumn(dateCells.length + 1)}
        row={getRow(dateCells.length + 1)}
        onClick={
          onDateClick
            ? (event) => onDateClick(event, new Date(year, month, i + 1))
            : undefined
        }
      />,
    );
  }

  for (let i = 0; i < nextMonthDates; i += 1) {
    dateCells.push(
      <DateCell
        date={i + 1}
        key={`${year}_${month + 1}_${i + 1}`}
        disabled
        column={getColumn(dateCells.length + 1)}
        row={getRow(dateCells.length + 1)}
      />,
    );
  }

  return (
    <DatesViewWrapper className="sinoui-dates-view" {...rest}>
      {dateCells}
    </DatesViewWrapper>
  );
}
