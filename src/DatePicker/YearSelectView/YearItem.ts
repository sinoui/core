import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import type { GridCellProps } from '../gridCellCss';
import gridCellCss from '../gridCellCss';

interface Props extends GridCellProps {
  $selected?: boolean;
}

const YearItem = styled(BaseButton)<Props>`
  width: 72px;
  height: 36px;
  border-radius: 18px;
  margin: 8px;
  box-sizing: border-box;
  overflow: hidden;
  ${gridCellCss}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 52px;
    height: 28px;
    margin: 2px;
  }

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
