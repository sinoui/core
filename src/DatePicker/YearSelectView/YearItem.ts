import styled, { css } from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import type { GridCellProps } from '../gridCellCss';
import gridCellCss from '../gridCellCss';

interface Props extends GridCellProps {
  $selected?: boolean;
  $isPc?: boolean;
}

const mobileStyle = css`
  width: 72px;
  height: 36px;
  margin: 8px;
`;

const pcStyle = css`
  width: 52px;
  height: 28px;
  margin: 2px;
`;

const YearItem = styled(BaseButton).attrs((props: Props) => ({
  style: gridCellCss(props),
}))<Props>`
  border-radius: 18px;
  box-sizing: border-box;
  overflow: hidden;
${mobileStyle}
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

  ${({ disabled, theme }) =>
    disabled &&
    `
      color: ${theme.palette.text.disabled};
    `}

  ${({ $selected, theme }) =>
    $selected &&
    `
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};

    &:hover {
      background-color: ${theme.palette.primary.main};
    }
  `}
`;

export default YearItem;
