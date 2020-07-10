import { css } from 'styled-components';
import adjustOpacity from '@sinoui/core/utils/adjustOpacity';
import { CLASSES } from '../constants';

const pcStyle = css`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 28px;
    width: 28px;
    font-size: 12px;
    .sinoui-date-cell-ripple-layout,
    .sinoui-date-cell-ripple {
      height: 28px;
      width: 28px;
    }
  }
`;

const mobileStyle = css`
  height: 36px;
  width: 36px;

  .sinoui-date-cell-ripple-layout,
  .sinoui-date-cell-ripple {
    height: 36px;
    width: 36px;
  }
`;

/**
 * 日期单元格样式
 */
const dateCellStyle = css`
  .${CLASSES.dateCell} {
    ${({ theme }) => theme.typography.body2}
    color: ${({ theme }) => theme.palette.text.primary};
  }

  .${CLASSES.dateCellContent} {
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    user-select: none;
    outline: none;
    margin: 2px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: ${({ theme }) =>
      theme.transitions.create(['background-color', 'color', 'border-color'])};

    ${mobileStyle}
    ${pcStyle}

    :hover {
      background-color: ${({ theme }) =>
        adjustOpacity(0.04, theme.palette.text.primary)};

      
      @media(hoer:none) {
        background-color: none;
      }
    }
  }

  .${CLASSES.dateCell}--outlined .${CLASSES.dateCellContent} {
    border: 1px solid currentColor;
  }

  .${CLASSES.dateCell}--disabled .${CLASSES.dateCellContent} {
    cursor: default;
    pointer-events: none;
    color: ${({ theme }) => theme.palette.text.disabled};
    :hover {
      background-color: none;
    }
  }

  .${CLASSES.dateCell}--selected .${CLASSES.dateCellContent} {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border: none;
    :hover {
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export default dateCellStyle;
