import styled, { css } from 'styled-components';

interface DateCellWrapperProps {
  $clickable?: boolean;
  $selected?: boolean;
  $outlined?: boolean;
  disabled?: boolean;
  $selectedRange?: boolean;
}

const selectedRangeCss = css``;

const DateCellWrapper = styled.div<DateCellWrapperProps>`
  position: relative;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${({ $selectedRange }) => $selectedRange && selectedRangeCss}
  }
`;

export default DateCellWrapper;
