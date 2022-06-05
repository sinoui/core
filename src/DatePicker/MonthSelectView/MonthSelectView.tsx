import classNames from 'classnames';
import type React from 'react';

import { MONTH_FULL_TITLES } from '../constants';
import YearItem from '../YearSelectView/YearItem';
import MonthSelectViewWrapper from './MonthSelectViewWrapper';

/**
 * 组件属性
 */
interface Props {
  /**
   * 组件样式
   */
  style?: React.CSSProperties;
  /**
   * 组件样式类
   */
  className?: string;
  /**
   * 已经选择的月份
   */
  selectedMonth?: number;
  /**
   * 选择月份的回调函数
   */
  onMonthSelect?: (month: number) => void;
  /**
   * 是否是 PC 模式
   */
  isPc?: boolean;
  /**
   * 最小可选月份
   */
  minMonth?: number;
  /**
   * 最大可选月份
   */
  maxMonth?: number;
}

/**
 * 选择月的视图
 *
 * @param pros 组建属性
 * @param pros.selectedMonth 已经选择的月份
 * @param pros.onMonthSelect 选择月份的回调函数
 * @param pros.className 组件样式类
 * @param pros.isPc 是否是 PC 模式
 * @param pros.minMonth 最小可选月份
 * @param pros.maxMonth 最大可选月份
 */
const MonthSelectView = ({
  selectedMonth,
  onMonthSelect,
  className,
  isPc,
  minMonth = 0,
  maxMonth = 11,
  ...rest
}: Props) => {
  const handleItemClick = (month: number) => () => {
    if (onMonthSelect) {
      onMonthSelect(month);
    }
  };

  return (
    <MonthSelectViewWrapper
      className={classNames('sinoui-month-select-view', className)}
      {...rest}
      $isPc={isPc}
    >
      {MONTH_FULL_TITLES.map((title, index) => (
        <YearItem
          key={title}
          row={Math.ceil((index + 1) / 3)}
          column={(index % 3) + 1}
          onClick={handleItemClick(index)}
          $selected={selectedMonth === index}
          data-month={index}
          $isPc={isPc}
          disabled={minMonth > index || maxMonth < index}
        >
          {title}
        </YearItem>
      ))}
    </MonthSelectViewWrapper>
  );
};

export default MonthSelectView;
