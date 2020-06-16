import styled, { css } from 'styled-components';
import Body2 from '@sinoui/core/Body2';

const mobileStyle = css<{ $isPc?: boolean }>`
  width: 40px;
  height: 40px;
`;

const pcStyle = css`
  font-size: 13px;
  width: 32px;
  height: 18px;
`;

const WeekTitle = styled(Body2)<{ $column: number; $isPc?: boolean }>`
  ${mobileStyle}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 18px;
  -ms-grid-column: ${({ $column }) => $column};
  -ms-grid-row: 1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${pcStyle}
  }

  ${({ $isPc }) =>
    !$isPc
      ? `
  && {
    ${mobileStyle}
  }`
      : pcStyle}
`;

export default WeekTitle;
