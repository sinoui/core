import React from 'react';
import bemClassNames from '@sinoui/core/utils/bemClassNames';
import { useRipple } from '@sinoui/ripple';
import styled from 'styled-components';
import DateCellContent from './DateCellContent';
import gridCellCss from '../gridCellCss';
import type { GridCellProps } from '../gridCellCss';

interface Props {
  /**
   * 显示的日期
   */
  date?: number;
  /**
   * 是否可点击
   */
  clickable?: boolean;
  /**
   * 选中状态
   */
  selected?: boolean;
  /**
   * 禁用状态
   */
  disabled?: boolean;
  /**
   * 显示轮廓
   */
  outlined?: boolean;
  /**
   * 所在的行数
   */
  row: number;
  /**
   * 所在的列号
   */
  column: number;
  /**
   * 点击事件回调函数
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const DateCellWrapper = styled.div<GridCellProps>`
  ${gridCellCss}
`;

/**
 * 日期单元格
 */
export default function DateCell(props: Props) {
  const {
    date,
    disabled,
    clickable = true,
    selected,
    outlined,
    onClick,
    ...rest
  } = props;
  const ref = useRipple({
    center: true,
    fixSize: true,
    rippleLayoutClassName: 'sinoui-date-cell-ripple-layout',
    rippleClassName: 'sinoui-date-cell-ripple',
    disabled: !clickable || disabled,
  });
  return (
    <DateCellWrapper
      {...rest}
      data-column={rest.column}
      data-row={rest.row}
      className={bemClassNames('sinoui-date-cell', {
        empty: date == null,
        selected,
        outlined,
        disabled,
      })}
    >
      {date == null ? null : (
        <DateCellContent
          className="sinoui-date-cell-content"
          forwardedAs="span"
          tabIndex={0}
          role="button"
          ref={ref}
          $clickable={clickable && !disabled}
          $selected={selected}
          $outlined={outlined}
          aria-disabled={disabled ? 'true' : undefined}
          disabled={disabled}
          onClick={onClick}
        >
          {date}
        </DateCellContent>
      )}
    </DateCellWrapper>
  );
}
