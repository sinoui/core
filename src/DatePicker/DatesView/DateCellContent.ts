import styled, { css } from 'styled-components';
import Body2 from '@sinoui/core/Body2';
import { Theme } from '@sinoui/theme';
import adjustOpacity from '@sinoui/core/utils/adjustOpacity';

interface DateCellContentProps {
  $clickable?: boolean;
  $selected?: boolean;
  $outlined?: boolean;
  disabled?: boolean;
  isPc?: boolean;
}

const getBackgroundColor = (props: DateCellContentProps & { theme: Theme }) => {
  const { $selected, theme } = props;

  return $selected ? theme.palette.primary.main : null;
};

const getTextColor = (props: DateCellContentProps & { theme: Theme }) => {
  if (props.disabled && !props.$selected) {
    return props.theme.palette.text.disabled;
  }
  const bgColor = getBackgroundColor(props);

  return bgColor ? props.theme.palette.getContrastText(bgColor) : null;
};

const pcStyle = css`
  height: 28px;
  width: 28px;
  font-size: 12px;
  .sinoui-date-cell-ripple-layout,
  .sinoui-date-cell-ripple {
    height: 28px;
    width: 28px;
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

const outlinedCss = css`
  border: 1px solid currentColor;
`;

/**
 * 日期单元格内容
 */
const DateCellContent = styled(Body2)<DateCellContentProps>`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center; 
  align-items: center;
  border-radius: 50%;
  user-select: none;
  outline: none;
  margin: 2px;
  transition: ${({ theme }) =>
    theme.transitions.create(['background-color', 'color', 'border-color'])};
  
  ${mobileStyle}
  ${({ isPc }) => isPc && pcStyle}
  ${({ $outlined }) => $outlined && outlinedCss}

  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  background-color: ${getBackgroundColor};
  color: ${getTextColor};

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${(props) =>
      !props.disabled && !getBackgroundColor(props)
        ? adjustOpacity(0.04, props.theme.palette.text.primary)
        : null};
  }
`;

export default DateCellContent;
