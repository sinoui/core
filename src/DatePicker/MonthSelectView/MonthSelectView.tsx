import React from 'react';
import { MONTH_FULL_TITLES } from '../constants';
import MonthSelectViewWrapper from './MonthSelectViewWrapper';
import YearItem from '../YearSelectView/YearItem';

interface Props {
  selectedMonth?: number;
  onMonthSelect?: (month: number) => void;
}

/**
 * 选择月的视图
 */
const MonthSelectView = ({ selectedMonth, onMonthSelect }: Props) => {
  const handleItemClick = (month: number) => () => {
    if (onMonthSelect) {
      onMonthSelect(month);
    }
  };

  return (
    <MonthSelectViewWrapper className="sinoui-month-select-view">
      {MONTH_FULL_TITLES.map((title, index) => (
        <YearItem
          row={Math.ceil((index + 1) / 3)}
          column={(index % 3) + 1}
          onClick={handleItemClick(index)}
          $selected={selectedMonth === index}
        >
          {title}
        </YearItem>
      ))}
    </MonthSelectViewWrapper>
  );
};

export default MonthSelectView;
