import styled from 'styled-components';
import ViewModel from '../ViewModel';

interface Props {
  $viewModel?: ViewModel;
}

const CalendarViewHeaderWrapper = styled.div<Props>`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  font-weight: 500;

  .sinoui-calendar-view-header__title {
    margin-right: 4px;
  }

  .sinoui-calendar-view-header__flex-unit {
    flex: 1;
  }

  .sinoui-calendar-view-header__prev-month-icon {
    margin-right: 24px;
  }

  .sinoui-calendar-view-header__next-month-icon > svg {
    transform: rotate(180deg);
  }

  .sinoui-calendar-view-header__year-dropdown-icon {
    transition: ${({ theme }) => theme.transitions.create('transform')};
    transform: rotate(
      ${({ $viewModel }) => ($viewModel !== ViewModel.dates ? 180 : 0)}deg
    );
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 16px 8px 12px 24px;
  }
`;

export default CalendarViewHeaderWrapper;
