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
  $isInHoverRange?: boolean;
  $isInHoverRangeStart?: boolean;
  $isInHoverRangeEnd?: boolean;
  $isPrevRangeStart?: boolean;
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

const inHoverRangeCss = css`
  border-top: 1px dashed ${({ theme }) => theme.palette.text.secondary};
  border-bottom: 1px dashed ${({ theme }) => theme.palette.text.secondary};
`;

const endRangeAndInHoverRangeCss = css`
  ::after {
    content: ' ';
    width: 32px;
    height: 28px;
    position: absolute;
    top: 2px;
    left: 16px;
    box-sizing: border-box;

    ${inHoverRangeCss}
  }
`;

const circleCss = css`
  width: 28px;
  left: 2px;
`;

const DateCellWrapper = styled.div<DateCellWrapperProps>`
  position: relative;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    ::before {
      content: ' ';
      width: 32px;
      height: 28px;
      position: absolute;
      top: 2px;
      box-sizing: border-box;

      ${({ $isSelectedRange }) => $isSelectedRange && selectedRangeCss}
      ${({ $isRangeStart, $isInHoverRangeStart }) =>
        ($isRangeStart || $isInHoverRangeStart) && startRangeCss}
      ${({ $isRangeEnd, $isInHoverRangeEnd }) =>
        ($isRangeEnd || $isInHoverRangeEnd) && endRangeCss}
      ${({ $isInHoverRange, $selected }) =>
        $isInHoverRange && !$selected && inHoverRangeCss};
        ${({
          $isRangeEnd,
          $isRangeStart,
          $isInHoverRangeStart,
          $isInHoverRangeEnd,
        }) =>
          (($isRangeStart && $isInHoverRangeEnd) ||
            ($isInHoverRangeStart && $isInHoverRangeEnd) ||
            ($isRangeStart && $isRangeEnd) ||
            ($isInHoverRangeStart && $isRangeEnd)) &&
          circleCss}
    }

    ${({ $selected, $isInHoverRangeEnd, $isInHoverRange }) =>
      $isInHoverRange &&
      !$isInHoverRangeEnd &&
      $selected &&
      endRangeAndInHoverRangeCss};

${({ $isPrevRangeStart, $isInHoverRange, $isRangeEnd }) =>
  $isPrevRangeStart &&
  $isInHoverRange &&
  !$isRangeEnd &&
  endRangeAndInHoverRangeCss}
   
  }
`;

export default DateCellWrapper;
