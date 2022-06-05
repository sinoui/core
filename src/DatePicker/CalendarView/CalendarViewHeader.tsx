import Body1 from '@sinoui/core/Body1';
import ArrowDropDownIcon from '@sinoui/core/svg-icons/ArrowDropDownIcon';
import ChevronLeftIcon from '@sinoui/core/svg-icons/ChevronLeftIcon';

import ViewModel from '../ViewModel';
import CalendarViewHeaderWrapper from './CalendarViewHeaderWrapper';
import SmallIconButton from './SmallIconButton';

/**
 * 组件属性
 */
interface Props {
  /**
   * 年
   */
  year: number;
  /**
   * 月
   */
  month: number;
  /**
   * 年月发生变化的回调函数
   */
  onChange: (year: number, month: number) => void;
  /**
   * 当前视图
   */
  viewModel?: ViewModel;
  /**
   * 开始的日历视图模型
   */
  startViewModel?: ViewModel.dates | ViewModel.months;
  /**
   * 视图发生变化时的回调函数
   */
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
 *
 * @param props 组件属性
 * @param props.year 年
 * @param props.month 月
 * @param props.onChange 年月发生变化的回调函数
 * @param props.viewModel 当前视图
 * @param props.onViewModelChange 视图发生变化时的回调函数
 * @param props.startViewModel 开始的日历视图
 */
export default function CalendarViewHeader({
  year,
  month,
  onChange,
  viewModel,
  onViewModelChange,
  startViewModel = ViewModel.dates,
  ...rest
}: Props) {
  const handleDropdownClick = () => {
    if (!onViewModelChange) {
      return;
    }
    if (viewModel !== startViewModel) {
      onViewModelChange(startViewModel);
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

  const handlePrevYear = () => {
    onChange(year - 1, month);
  };

  const handleNextYear = () => {
    onChange(year + 1, month);
  };

  return (
    <CalendarViewHeaderWrapper
      $isStartViewModel={viewModel === startViewModel}
      className="sinoui-calendar-view-header"
      {...rest}
    >
      <Body1 className="sinoui-calendar-view-header__title">
        {year}年
        {startViewModel === ViewModel.dates && <>{monthTitles[month]}月</>}
      </Body1>
      <SmallIconButton
        className="sinoui-calendar-view-header__year-dropdown-icon"
        onClick={handleDropdownClick}
      >
        <ArrowDropDownIcon />
      </SmallIconButton>
      <div className="sinoui-calendar-view-header__flex-unit" />
      {viewModel === startViewModel && (
        <>
          <SmallIconButton
            className="sinoui-calendar-view-header__prev-month-icon"
            onClick={
              startViewModel === ViewModel.dates
                ? handlePrevMonth
                : handlePrevYear
            }
          >
            <ChevronLeftIcon />
          </SmallIconButton>
          <SmallIconButton
            className="sinoui-calendar-view-header__next-month-icon"
            onClick={
              startViewModel === ViewModel.dates
                ? handleNextMonth
                : handleNextYear
            }
          >
            <ChevronLeftIcon />
          </SmallIconButton>
        </>
      )}
    </CalendarViewHeaderWrapper>
  );
}
