import styled from 'styled-components';
import Body2 from '@sinoui/core/Body2';

const WeekTitle = styled(Body2)<{ $column: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 18px;
  width: 40px;
  height: 40px;
  -ms-grid-column: ${({ $column }) => $column};
  -ms-grid-row: 1;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 32px;
    height: 18px;
  }
`;

export default WeekTitle;
