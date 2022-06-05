import React from 'react';
import classNames from 'classnames';
import { MONTH_FULL_TITLES } from '@sinoui/core/DatePicker/constants';
import MonthSelectViewWrapper from '@sinoui/core/DatePicker/MonthSelectView/MonthSelectViewWrapper';
import YearItem from '@sinoui/core/DatePicker/YearSelectView/YearItem';

interface Props {
  style?: React.CSSProperties;
  className?: string;
  selectedMonth?: number;
  value?: string;
  year: number;
  onMonthSelect?: (month: number) => void;
  isPc?: boolean;
  minDate?: string;
  maxDate?: string;
}

/**
 * 选择月的视图
 */
const MonthSelectView = ({
  selectedMonth,
  onMonthSelect,
  className,
  isPc,
  value,
  year,
  maxDate,
  minDate,
  ...rest
}: Props) => {
  const handleItemClick = (month: number) => () => {
    if (onMonthSelect) {
      onMonthSelect(month);
    }
  };

  const isSelected = (month: number) => {
    const valueYear = value?.split('-')?.[0];
    const isCurrentYear = valueYear ? Number(valueYear) === year : false;
    return isCurrentYear && selectedMonth === month;
  };

  const isDisabled = (month: number) => {
    let maxCheck = false;
    if (maxDate) {
      const [maxYear, maxMonth] = maxDate.split('-');
      maxCheck =
        Number(maxYear) < year ||
        (Number(maxYear) === year && Number(maxMonth) - 1 < month);
    }

    let minCheck = false;
    if (minDate) {
      const [minYear, minMonth] = minDate.split('-');
      minCheck =
        Number(minYear) > year ||
        (Number(minYear) === year && Number(minMonth) - 1 > month);
    }

    return maxCheck || minCheck;
  };

  return (
    <MonthSelectViewWrapper
      className={classNames('sinoui-month-select-view', className)}
      {...rest}
      $isPc={isPc}
    >
      {MONTH_FULL_TITLES.map((title, index) => (
        <YearItem
          key={`${year}-${title}`}
          row={Math.ceil((index + 1) / 3)}
          column={(index % 3) + 1}
          onClick={handleItemClick(index)}
          $selected={isSelected(index)}
          data-month={index}
          $isPc={isPc}
          disabled={isDisabled(index)}
        >
          {title}
        </YearItem>
      ))}
    </MonthSelectViewWrapper>
  );
};

export default MonthSelectView;
