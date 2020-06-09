import styled from 'styled-components';

const DateRangeHeaderWrapper = styled.div`
  .sinoui-date-range-picker-header__next-month-icon {
    transition: ${({ theme }) => theme.transitions.create('transform')};
    transform: rotate(180deg);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: flex;
    padding: 16px 16px 8px;
  }
`;

export default DateRangeHeaderWrapper;
