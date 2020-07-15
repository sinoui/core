import React from 'react';
import styled from 'styled-components';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';
import ClickableText from './ClickableText';

interface Props {
  /**
   * 年份
   */
  year?: number;
  /**
   * 当前日历状态
   */
  viewModel: ViewModel;
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
  const { year, viewModel, onViewModelChange } = props;

  const onDateClick = (type: ViewModel) => {
    if (onViewModelChange) {
      onViewModelChange(type);
    }
  };
  return (
    <DateTimeMobileViewToolbarWrapper>
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
          6月1日
        </ClickableText>
      </LeftDateWrapper>
      <Time
        fontSize={48}
        onClick={() => onDateClick(ViewModel.time)}
        selected={viewModel === ViewModel.time}
      >
        20:09
      </Time>
    </DateTimeMobileViewToolbarWrapper>
  );
}
