import styled from 'styled-components';
import CalendarContent from '../CalendarContent';

const YearSelectViewWrapper = styled(CalendarContent)<{ $columns: number }>`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: ${({ $columns }) =>
    new Array<string>($columns).fill('1fr').join(' ')};
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  justify-content: space-between;
  box-sizing: border-box;
  overflow: auto;
`;

export default YearSelectViewWrapper;
