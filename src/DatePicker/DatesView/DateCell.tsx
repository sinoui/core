/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import bemClassNames from '@sinoui/core/utils/bemClassNames';
import { useRipple } from '@sinoui/ripple';
import gridCellCss from '../gridCellCss';
import { CLASSES } from '../constants';

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
  onClick?: (event: React.MouseEvent<HTMLElement>, date: number) => void;
  /**
   * 鼠标移入时的回调函数
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 鼠标移出时的回调函数
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

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
    row,
    column,
    ...rest
  } = props;
  const ref = useRipple<HTMLSpanElement>({
    center: true,
    fixSize: true,
    rippleLayoutClassName: 'sinoui-date-cell-ripple-layout',
    rippleClassName: 'sinoui-date-cell-ripple',
    disabled: !clickable || disabled,
  });
  return (
    <div
      style={gridCellCss({ row, column })}
      {...rest}
      data-column={column}
      data-row={row}
      className={bemClassNames(CLASSES.dateCell, {
        empty: date == null,
        selected,
        outlined,
        disabled,
      })}
    >
      {date == null ? null : (
        <span
          className={CLASSES.dateCellContent}
          tabIndex={0}
          role="button"
          ref={ref}
          aria-disabled={disabled ? 'true' : undefined}
          onClick={(event) => onClick && onClick(event, date)}
        >
          {date}
        </span>
      )}
    </div>
  );
}
