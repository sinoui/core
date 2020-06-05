import React from 'react';
import classNames from 'classnames';
import { MONTH_FULL_TITLES } from '../constants';
import MonthSelectViewWrapper from './MonthSelectViewWrapper';
import YearItem from '../YearSelectView/YearItem';

interface Props {
  style?: React.CSSProperties;
  className?: string;
  selectedMonth?: number;
  onMonthSelect?: (month: number) => void;
}

/**
 * 选择月的视图
 */
const MonthSelectView = ({
  selectedMonth,
  onMonthSelect,
  className,
  ...rest
}: Props) => {
  const handleItemClick = (month: number) => () => {
    if (onMonthSelect) {
      onMonthSelect(month);
    }
  };

  return (
    <MonthSelectViewWrapper
      className={classNames('sinoui-month-select-view', className)}
      {...rest}
    >
      {MONTH_FULL_TITLES.map((title, index) => (
        <YearItem
          row={Math.ceil((index + 1) / 3)}
          column={(index % 3) + 1}
          onClick={handleItemClick(index)}
          $selected={selectedMonth === index}
          data-month={index}
        >
          {title}
        </YearItem>
      ))}
    </MonthSelectViewWrapper>
  );
};

export default MonthSelectView;
