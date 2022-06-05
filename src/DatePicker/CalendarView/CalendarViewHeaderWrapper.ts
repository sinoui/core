import styled from 'styled-components';

/**
 * 组件属性
 */
interface Props {
  /**
   * 当前视图是否为日历的开始视图
   */
  $isStartViewModel: boolean;
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
      ${({ $isStartViewModel }) => ($isStartViewModel ? 0 : 180)}deg
    );
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 16px 8px 12px 24px;
  }
`;

export default CalendarViewHeaderWrapper;
