import styled from 'styled-components';
import CalendarContent from '../CalendarContent';

const MonthSelectViewWrapper = styled(CalendarContent)`
  display: -ms-grid;
  display: grid;

  -ms-grid-columns: 1fr 1fr 1fr;
  -ms-grid-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: repeat(3, auto);
  align-content: space-around;
  justify-content: space-around;

  & > * {
    -ms-grid-column-align: center;
    -ms-grid-row-align: center;
  }
`;

export default MonthSelectViewWrapper;
