import React from 'react';
import ArrowDropDownIcon from '@sinoui/core/svg-icons/ArrowDropDownIcon';
import ChevronLeftIcon from '@sinoui/core/svg-icons/ChevronLeftIcon';
import Body1 from '@sinoui/core/Body1';
import SmallIconButton from './SmallIconButton';
import CalendarViewHeaderWrapper from './CalendarViewHeaderWrapper';
import ViewModel from '../ViewModel';

interface Props {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  viewModel?: ViewModel;
  onViewModelChange?: (viewModel: ViewModel) => void;
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

/**
 * 日历视图的头部
 */
export default function CalendarViewHeader({
  year,
  month,
  onChange,
  viewModel,
  onViewModelChange,
  ...rest
}: Props) {
  const handleDropdownClick = () => {
    if (!onViewModelChange) {
      return;
    }
    if (viewModel !== ViewModel.dates) {
      onViewModelChange(ViewModel.dates);
    } else {
      onViewModelChange(ViewModel.years);
    }
  };

  const handlePrevMonth = () => {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    onChange(prevYear, prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    onChange(nextYear, nextMonth);
  };

  return (
    <CalendarViewHeaderWrapper
      $viewModel={viewModel}
      className="sinoui-calendar-view-header"
      {...rest}
    >
      <Body1 className="sinoui-calendar-view-header__title">
        {year}年{monthTitles[month]}月
      </Body1>
      <SmallIconButton
        className="sinoui-calendar-view-header__year-dropdown-icon"
        onClick={handleDropdownClick}
      >
        <ArrowDropDownIcon />
      </SmallIconButton>
      <div className="sinoui-calendar-view-header__flex-unit" />
      {viewModel === ViewModel.dates && (
        <>
          <SmallIconButton
            className="sinoui-calendar-view-header__prev-month-icon"
            onClick={handlePrevMonth}
          >
            <ChevronLeftIcon />
          </SmallIconButton>
          <SmallIconButton
            className="sinoui-calendar-view-header__next-month-icon"
            onClick={handleNextMonth}
          >
            <ChevronLeftIcon />
          </SmallIconButton>
        </>
      )}
    </CalendarViewHeaderWrapper>
  );
}
