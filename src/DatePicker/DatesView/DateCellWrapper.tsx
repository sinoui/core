import styled, { css } from 'styled-components';
import { opacify } from 'polished';

interface DateCellWrapperProps {
  $clickable?: boolean;
  $selected?: boolean;
  $outlined?: boolean;
  disabled?: boolean;
  $isSelectedRange?: boolean;
  $isRangeStart?: boolean;
  $isRangeEnd?: boolean;
}

const selectedRangeCss = css`
  background-color: ${({ theme }) => opacify(-0.8, theme.palette.primary.main)};
`;

const startRangeCss = css`
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
`;

const endRangeCss = css`
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
`;

const DateCellWrapper = styled.div<DateCellWrapperProps>`
  position: relative;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    ::before {
      content: ' ';
      width: 32px;
      height: 28px;
      position: absolute;
      top: 1px;

      ${({ $isSelectedRange }) => $isSelectedRange && selectedRangeCss}
      ${({ $isRangeStart }) => $isRangeStart && startRangeCss}
      ${({ $isRangeEnd }) => $isRangeEnd && endRangeCss}
    }
  }
`;

export default DateCellWrapper;
