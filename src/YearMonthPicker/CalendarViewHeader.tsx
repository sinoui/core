import React from 'react';
import ArrowDropDownIcon from '@sinoui/core/svg-icons/ArrowDropDownIcon';
import Body1 from '@sinoui/core/Body1';
import SmallIconButton from '@sinoui/core/DatePicker/CalendarView/SmallIconButton';
import CalendarViewHeaderWrapper from '@sinoui/core/DatePicker/CalendarView/CalendarViewHeaderWrapper';
import ChevronLeftIcon from '@sinoui/core/svg-icons/ChevronLeftIcon';
import ViewModel from './ViewModel';

interface Props {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  viewModel?: ViewModel;
  onViewModelChange?: (viewModel: ViewModel) => void;
}

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
    onViewModelChange(ViewModel.years);
  };

  const handlePrevYear = () => {
    onChange(year - 1, month);
  };

  const handleNextYear = () => {
    onChange(year + 1, month);
  };

  return (
    <CalendarViewHeaderWrapper
      $viewModel={viewModel}
      className="sinoui-calendar-view-header"
      {...rest}
    >
      <Body1 className="sinoui-calendar-view-header__title">{year}年</Body1>
      <SmallIconButton
        className="sinoui-calendar-view-header__year-dropdown-icon"
        onClick={handleDropdownClick}
      >
        <ArrowDropDownIcon />
      </SmallIconButton>
      <div className="sinoui-calendar-view-header__flex-unit" />
      <SmallIconButton
        className="sinoui-calendar-view-header__prev-month-icon"
        onClick={handlePrevYear}
      >
        <ChevronLeftIcon />
      </SmallIconButton>
      <SmallIconButton
        className="sinoui-calendar-view-header__next-month-icon"
        onClick={handleNextYear}
      >
        <ChevronLeftIcon />
      </SmallIconButton>
    </CalendarViewHeaderWrapper>
  );
}
