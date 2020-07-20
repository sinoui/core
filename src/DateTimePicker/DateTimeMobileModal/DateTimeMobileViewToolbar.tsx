import React from 'react';
import styled from 'styled-components';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';
import ClickableText from './ClickableText';
import formatTime from './formatTime';

interface Props {
  /**
   * 年份
   */
  year?: number;
  /**
   * 月份
   */
  month?: number;
  /**
   * 天
   */
  day?: number;
  /**
   * 小时
   */
  hour?: string;
  /**
   * 分钟
   */
  minute?: string;
  /**
   * 当前日历状态
   */
  viewModel: ViewModel;
  /**
   * 选择状态发生改变时的回调函数
   */
  onViewModelChange?: (viewModel: ViewModel) => void;
}

const DateTimeMobileViewToolbarWrapper = styled.div`
  height: 96px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  & > * {
    color: currentColor;
  }
`;

const LeftDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Time = styled(ClickableText)`
  align-self: flex-end;
  margin-bottom: -6px;
`;

export default function DateTimeMobileViewToolbar(props: Props) {
  const {
    year,
    viewModel,
    onViewModelChange,
    month = new Date().getMonth(),
    day = new Date().getDate(),
    hour,
    minute,
  } = props;

  const onDateClick = (type: ViewModel) => {
    if (onViewModelChange) {
      onViewModelChange(type);
    }
  };
  return (
    <DateTimeMobileViewToolbarWrapper className="sinoui-date-time-mobile-view__toolbar">
      <LeftDateWrapper>
        <ClickableText
          onClick={() => onDateClick(ViewModel.years)}
          selected={viewModel === ViewModel.years}
        >
          {year}
        </ClickableText>
        <ClickableText
          fontSize={34}
          onClick={() => onDateClick(ViewModel.dates)}
          selected={viewModel === ViewModel.dates}
        >
          {month + 1}月{day}日
        </ClickableText>
      </LeftDateWrapper>
      <Time
        fontSize={48}
        onClick={() => onDateClick(ViewModel.time)}
        selected={viewModel === ViewModel.time}
      >
        {formatTime(hour)}:{formatTime(minute)}
      </Time>
    </DateTimeMobileViewToolbarWrapper>
  );
}
