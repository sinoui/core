import styled from 'styled-components';

const DateRangeHeaderWrapper = styled.div`
  display: flex;
  padding: 16px 16px 8px;

  .sinoui-date-range-picker-header__next-month-icon {
    transition: ${({ theme }) => theme.transitions.create('transform')};
    transform: rotate(180deg);
  }

  .sinoui-date-range-picker-header__space {
    width: 32px;
  }
`;

export default DateRangeHeaderWrapper;
