import styled from 'styled-components';

interface DateCellWrapperProps {
  $clickable?: boolean;
  $selected?: boolean;
  $outlined?: boolean;
  disabled?: boolean;
  $isColumnEnd?: boolean;
}

const DateCellWrapper = styled.div<DateCellWrapperProps>`
  position: relative;
`;

export default DateCellWrapper;
