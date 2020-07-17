import styled, { css } from 'styled-components';
import adjustOpacity from '@sinoui/core/utils/adjustOpacity';

interface Props {
  outlined?: boolean;
}

const outlinedStyle = css`
  border: 1px dashed
    ${({ theme }) => adjustOpacity(0.25, theme.palette.text.disabled)};
`;

const raisedStyle = css`
  background-color: ${({ theme }) =>
    adjustOpacity(0.2, theme.palette.primary.main)};
`;

const WeekStatusBarWrapper = styled.div<Props>`
  position: absolute;
  box-sizing: border-box;
  ${({ outlined }) => (outlined ? outlinedStyle : raisedStyle)}
`;

export default WeekStatusBarWrapper;
